import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
    return (
        <ul className="space-y-3">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-600">Tidak ada tugas yang ditemukan.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleComplete={onToggleComplete}
                    />
                ))
            )}
        </ul>
    );
}

export default TaskList;