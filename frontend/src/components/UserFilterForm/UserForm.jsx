import React, { useState, useEffect } from 'react';

const UserForm = ({ userToEdit, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [identification, setIdentification] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setIdentification(userToEdit.identification);
            setEmail(userToEdit.email);
            setPhone(userToEdit.phone || '');
        } else {
            // Limpiar formulario si no hay usuario para editar
            setName('');
            setIdentification('');
            setEmail('');
            setPhone('');
        }
    }, [userToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, identification, email, phone });
        setName('');
        setIdentification('');
        setEmail('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>{userToEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
            <div>
                <label>Nombre:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
            </div>
            <div>
                <label>Identificación:</label>
                <input type="text" value={identification} onChange={(e) => setIdentification(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
            </div>
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
                {userToEdit ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
            {userToEdit && (
                <button type="button" onClick={onCancel} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default UserForm;