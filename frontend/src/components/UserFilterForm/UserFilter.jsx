import React, { useState } from 'react';

const UserFilter = ({ onFilter }) => {
    const [identification, setIdentification] = useState('');

    const handleFilter = (e) => {
        e.preventDefault();
        // Llama a la función onFilter con el valor actual de 'identification'
        onFilter(identification);
    };

    const handleClearFilter = () => {
        setIdentification(''); // Limpia el input
        onFilter(''); // Llama a onFilter con una cadena vacía para obtener todos los usuarios
    };

    return (
        <form className='mx-5  sm:' onSubmit={handleFilter} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <label
                htmlFor="filterIdentification"
                className='w-full font-semibold'
            >
                Identificación:</label>
            <input
                className='mt-2 mb-3 w-full'
                type="text"
                id="identificacion"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                placeholder="Introduce la identificación"
                style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <div className='flex justify-between sm:justify-end sm:gap-3'>
                <button type="submit" style={{ padding: '8px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Buscar
                </button>
                <button type="button" onClick={handleClearFilter} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Limpiar Filtro
                </button>
            </div>
        </form>
    );
};

export default UserFilter;