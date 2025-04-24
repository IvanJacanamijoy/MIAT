const LoginForm = () => {
    return (
      // Contenedor principal del formulario que centra el contenido vertical y horizontalmente
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Tarjeta del formulario con fondo blanco, bordes redondeados y sombra */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          {/* Contenedor para el logo, centrado en la parte superior */}
          <div className="flex justify-center mb-4">
            <img src="src/assets/images/navbar/logo_miat_rojo.png" alt="MIAT Logo" className="h-12" />
          </div>
  
          {/* Inicio del formulario */}
          <form>
            {/* Campo de entrada para el correo electrónico */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="Ingrese su correo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
  
            {/* Campo de entrada para la contraseña */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
  
            {/* Sección con checkbox para recordar contraseña y enlace para recuperación */}
            <div className="flex items-center justify-between mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-red-600" />
                <span className="ml-2 text-gray-700">Recordar Contraseña</span>
              </label>
              <a href="#" className="inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-800">
                Olvidé mi contraseña
              </a>
            </div>
  
            {/* Botón para enviar el formulario */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;