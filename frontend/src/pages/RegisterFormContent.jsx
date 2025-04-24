import React, { useState } from 'react';

const RegisterFormContent = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value // Maneja checkboxes y otros inputs
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // --- Lógica de validación y envío del formulario ---
    console.log('Datos del formulario de registro:', formData);

    // Ejemplo básico de validación: verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return; // Detiene el envío si no coinciden
    }

    // Ejemplo de validación: verificar que se acepten los términos
    if (!formData.agreeTerms) {
        alert('Debes aceptar los Términos y Condiciones para registrarte.');
        return; // Detiene el envío si no se aceptan los términos
    }

    // Si la validación pasa, puedes enviar los datos a tu backend aquí
    // Por ahora, solo mostramos los datos en consola y reseteamos el formulario
    alert('¡Registro exitoso! (Simulado)');
    setFormData({ // Resetea el formulario
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    // --- Fin de la lógica de validación y envío ---
  };

  return (
    // Contenedor con estilos similares al formulario en la página principal (fondo blanco, padding, sombras)
    <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg py-12">
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-gray-950 mb-6 text-center">Crear Cuenta</h2>

      {/* Formulario en sí */}
      <form onSubmit={handleSubmit} className="space-y-4"> {/* space-y-4 añade espacio vertical entre elementos hijos */}

        {/* Campo Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required // Hace que el campo sea obligatorio
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-gray-950"
          />
        </div>

        {/* Campo Correo Electrónico */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
          <input
            type="email" // Usa type="email" para validación básica del navegador
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-gray-950"
          />
        </div>

        {/* Campo Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
          <input
            type="password" // Usa type="password" para ocultar la entrada
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6" // Ejemplo: longitud mínima de 6 caracteres
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-gray-950"
          />
        </div>

        {/* Campo Confirmar Contraseña */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-gray-950"
          />
        </div>

        {/* Checkbox de Términos y Condiciones */}
        <div className="flex items-center">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required // Hace que aceptar los términos sea obligatorio
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
          Acepto los <a href="#" className="text-red-600 hover:text-red-700">Términos y Condiciones</a> {/* Enlace simulado */}
          </label>
        </div>


        {/* Botón de Registro */}
        <div>
          <button
            type="submit" // Importante para que funcione el onSubmit del formulario
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Registrarse
          </button>
        </div>
      </form>
       {/* Opcional: Enlace a la página de inicio de sesión si ya tienen cuenta */}
       <div className="mt-6 text-center">
           <p className="text-sm text-gray-600">
               ¿Ya tienes una cuenta?{' '}
               <a href="/login" className="font-medium text-red-600 hover:text-red-500">
                   Inicia Sesión
               </a>
           </p>
       </div>
    </div>
  );
};

export default RegisterFormContent;