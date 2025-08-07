const express = require('express');
const {getAllTasks, addTask, updateTask, deleteTask, getFilteredTasks} = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Semua rute tugas memerlukan autentikasi
router.get('/', auth, getAllTasks);
router.get('/filter', auth, getFilteredTasks);
router.post('/', auth, addTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;