import React from 'react';

function FilterButtons({ onFilterChange }) {
    return (
        <div className="flex justify-center space-x-4 mb-6">
            <button
                onClick={() => onFilterChange('all')}
                className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
                Semua
            </button>
            <button
                onClick={() => onFilterChange('completed')}
                className="px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200"
            >
                Selesai
            </button>
            <button
                onClick={() => onFilterChange('incomplete')}
                className="px-4 py-2 rounded-md border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200"
            >
                Belum Selesai
            </button>
        </div>
    );
}

export default FilterButtons;