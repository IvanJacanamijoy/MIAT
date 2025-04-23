import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
    // Estado para datos del formulario
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

    // Estado para manejar errores en los campos
    const [errors, setErrors] = useState({});

    // Maneja cambios en los inputs y actualiza el estado
    const handleChange = ({ target: { name, value } }) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
        // Limpia el error si el usuario corrige el campo
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    // Función para validar los datos antes del envío
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'El primer nombre es requerido.';
        if (!formData.firstLastName.trim()) newErrors.firstLastName = 'El primer apellido es requerido.';
        if (!formData.idNumber) newErrors.idNumber = 'El número de cédula es requerido.';
        if (!formData.phone) newErrors.phone = 'El número telefónico es requerido.';
        if (!formData.address.trim()) newErrors.address = 'La dirección es requerida.';
        if (!formData.email.includes('@')) newErrors.email = 'El correo debe ser válido.';
        if (!formData.creationDate) newErrors.creationDate = 'La fecha de creación es requerida.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Evita el envío si hay errores

        console.log('Formulario enviado:', formData);
        alert('Registro guardado exitosamente');
    };

    // Lista de campos del formulario
    const fields = [
        { label: 'Primer Nombre', name: 'firstName', type: 'text', required: true },
        { label: 'Segundo Nombre', name: 'secondName', type: 'text' },
        { label: 'Primer Apellido', name: 'firstLastName', type: 'text', required: true },
        { label: 'Segundo Apellido', name: 'secondLastName', type: 'text' },
        { label: 'Número de Cédula', name: 'idNumber', type: 'number', required: true },
        { label: 'Número Telefónico', name: 'phone', type: 'tel', required: true },
        { label: 'Dirección', name: 'address', type: 'text', required: true },
        { label: 'Correo Electrónico', name: 'email', type: 'email', required: true },
        { label: 'Fecha de Creación', name: 'creationDate', type: 'date', required: true },
    ];

    return (
        <div className="form-container">
            <h2>Registrar Usuario</h2>
            <form onSubmit={handleSubmit}>
                {/* Iteración dinámica de campos */}
                {fields.map(({ label, name, type, required }) => (
                    <div className="form-group" key={name}>
                        <label htmlFor={name}>{label}</label>
                        <input
                            id={name}
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required={required}
                            aria-label={label} // Mejora accesibilidad
                        />
                        {/* Muestra mensaje de error si existe */}
                        {errors[name] && <p className="error-message">{errors[name]}</p>}
                    </div>
                ))}

                {/* Botón de envío */}
                <button type="submit" className="btn-save">Guardar</button>
            </form>
        </div>
    );
};

export default RegisterForm;