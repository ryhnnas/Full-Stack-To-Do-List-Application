const {pool} = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute(
            'INSERT INTO users (username, passwordHash, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email]
        );
        res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(400).json({message: 'Registeration Failed', error: err.message});
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) {
            return res.status(400).json({message: 'Invalid credential'});
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token, userid: user.id, username: user.username});
    } catch (err) {
        res.status(500).json({message: 'Login failed', error: err.message});
    }
};