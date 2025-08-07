const {pool} = require('../config/db');

// Get all Tasks
exports.getAllTasks = async (req, res) => {
    try {
        // Asumsi autentikasi telah memvalidasi token dan menambahkan req.user.userId
        // Jika tidak ada autentikasi, Anda bisa menghapus bagian WHERE userId = ?
        const userId = req.user ? req.user.userId : null;
        let query = 'SELECT id, title, deskription, isCompleted, createdAt FROM tasks';
        let params = [];

        if (userId) {
            query += 'WHERE userId = ?';
            params.push(userId);
        }

        const [rows] = await pool.execute(query, params);
        res.json(rows);
    } catch (err) {
        console.error("Error in getAllTasks:", err);
        res.status(500).json({message: err.message});
    }
};

// Add a new task
exports.addTask = async (req, res) => {
    const {title, description} = req.body;
    const userId = req.user ? req.user.userId : null;
    try {
        const [result] = await pool.execute(
            'INSERT INTO tasks (title, description, userId) VALUES (?, ?, ?)',
            [title, description, userId]
        );
        const newTask = {id: result.insertId, title, description, isCompleted: false, createdAt: new Date(), userId: userId};
        res.status(201).json(newTask);
    } catch (err) {
        console.error("Error in addTask:", err);
        res.status(400).json({message: err.message});
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, description, isCompleted} = req.body;
    const userId = req.user ? req.user.userId : null;

    try {
        // Pastikan pengguna hanya bisa memperbarui tugas mereka sendiri
        let query = 'UPDATE tasks SET title = ?, description = ?, isCompleted = ? WHERE id = ?';
        let params = [title, description, isCompleted, id];

        if (userId) {
            query += ' AND userId = ?';
            params.push(userId);
        }

        const [result] = await pool.execute(query, params);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Task not found or you do not have permission to update it'});
        }
        res.json({message: 'Task Update'});
    } catch (err) {
        console.error("Error in updateTask:", err);
        res.status(500).json({message: err.message});
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    const {id} = req.params;
    const userId = req.user ? req.user.userId : null;

    try {
        // Pastikan pengguna hanya bisa menghapus tugas mereka sendiri
        let query = 'DELETE FROM tasks where id = ?'
        let params = [id];

        if (userId) {
            query += ' AND userId = ?';
            params.push(userId);
        }

        const [result] = await pool.execute(query, params);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Task not found or you do not have permission to delete it.'});
        }
        res.json({message: 'Task deleted'});
    } catch (err) {
        console.error("Error in deleteTask:", err);
        res.status(500).json({message: err.message});
    }
};

// Implement more for filtering (e.g., get completed tasks)
exports.getFilteredTasks = async (req, res) => {
    const {status} = req.query; // completed or incomplete
    const userId = req.user ? req.user.userId : null;
    let query = 'SELECT id, title, description, isCompleted, createdAt FROM tasks ';
    let params = [];

    let whereClauses = [];
    if (userId) {
        whereClauses.push('userId = ?');
        params.push(userId);
    }
    if (status === 'completed') {
        whereClauses.push('isCompleted = ?');
        params.push(true);
    } else if (status === 'incomplete') {
        whereClauses.push('isCompleted = ?');
        params.push(false);
    }

    if (whereClauses.length > 0) {
        query += 'WHERE ' + whereClauses.join(' AND ');
    }

    try {
        const [rows] = await pool.execute(query, params);
        res.json(rows);
    } catch (err) {
        console.error("Error in getFilteredTasks:", err);
        res.status(500).json({message: err.message});
    }
};