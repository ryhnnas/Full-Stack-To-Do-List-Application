import React from 'react';

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
    return (
        <li className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm mb-3">
            <div className={`flex-grow ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                <h5 className="text-lg font-semibold text-gray-800">{task.title}</h5>
                <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => onToggleComplete(task.id, !task.isCompleted)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <button
                    onClick={() => onEdit(task)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md text-sm hover:bg-yellow-600 transition-colors duration-200"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md text-sm hover:bg-red-700 transition-colors duration-200"
                >
                    Hapus
                </button>
            </div>
        </li>
    );
}

export default TaskItem;