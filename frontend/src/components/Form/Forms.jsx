import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        firstLastName: '',
        secondLastName: '',
        idNumber: '',
        phone: '',
        address: '',
        email: '',
        creationDate: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        alert('Registro guardado exitosamente');
    };

    return (
        <div className="form-container">
            <h2>Registrar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Primer Nombre</label>
                    <input type="text" name="firstName" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Segundo Nombre</label>
                    <input type="text" name="secondName" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Primer Apellido</label>
                    <input type="text" name="firstLastName" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Segundo Apellido</label>
                    <input type="text" name="secondLastName" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Número de Cédula</label>
                    <input type="number" name="idNumber" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Número Telefónico</label>
                    <input type="tel" name="phone" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input type="text" name="address" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Fecha de Creación</label>
                    <input type="date" name="creationDate" onChange={handleChange} required />
                </div>

                <button type="submit" className="btn-save">Guardar</button>
            </form>
        </div>
    );
};

export default RegisterForm;