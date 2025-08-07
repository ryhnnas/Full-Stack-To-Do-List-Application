import React, { useState, useEffect } from 'react';
import taskService from './services/taskService';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import AuthForm from './components/AuthForm'; // Import AuthForm


function App() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State autentikasi

    useEffect(() => {
        // Cek token saat aplikasi dimuat
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            fetchTasks();
        }
    }, [filter, isAuthenticated]);

    const fetchTasks = async () => {
        try {
            const response = await taskService.getFilteredTasks(filter);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            // Jika error 401 (Unauthorized), mungkin token expired atau tidak valid
            if (error.response && error.response.status === 401) {
                taskService.logout();
                setIsAuthenticated(false);
                setTasks([]);
                setCurrentTask(null); // Reset current task on logout
            }
        }
    };

    const handleAddTask = async (task) => {
        try {
            if (currentTask) {
                // Pastikan isCompleted disertakan saat update
                await taskService.updateTask(currentTask.id, { ...task, isCompleted: currentTask.isCompleted });
                // Perbarui state 'tasks' secara langsung untuk tugas yang diupdate
                setTasks(prevTasks =>
                    prevTasks.map(t =>
                        t.id === currentTask.id ? { ...t, ...task, isCompleted: currentTask.isCompleted } : t
                    )
                );
                setCurrentTask(null);
            } else {
                const response = await taskService.addTask(task); // Pastikan backend mengembalikan tugas yang baru ditambahkan
                setTasks(prevTasks => [...prevTasks, response.data]);
            }
            fetchTasks(); // Refresh daftar tugas
        } catch (error) {
            console.error('Error adding/updating task:', error);
        }
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
    };

    const handleDeleteTask = async (id) => {
        try {
            await taskService.deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = async (id, isCompleted) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === id);
            if (taskToUpdate) {
                await taskService.updateTask(id, { ...taskToUpdate, isCompleted: isCompleted });
                setTasks(prevTasks =>
                    prevTasks.map(t =>
                        t.id === id ? { ...t, isCompleted: isCompleted } : t
                    )
                );
                fetchTasks();
            }
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        fetchTasks(); // Muat tugas setelah login berhasil
    };

    const handleLogout = () => {
        taskService.logout();
        setIsAuthenticated(false);
        setTasks([]); // Bersihkan tugas setelah logout
        setCurrentTask(null); // Bersihkan form edit
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Aplikasi To-Do List</h1>
                {!isAuthenticated ? (
                    <AuthForm onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <>
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                        <TaskForm currentTask={currentTask} onSubmit={handleAddTask} />
                        <FilterButtons onFilterChange={handleFilterChange} />
                        <TaskList
                            tasks={tasks}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onToggleComplete={handleToggleComplete}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;