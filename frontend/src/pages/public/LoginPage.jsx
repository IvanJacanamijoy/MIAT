import LoginForm from '../../components/LoginForm'; // Asegúrate de que la ruta al componente Form sea correcta

const LoginPage = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[url(src/assets/images/home/imagen_fondo.png)] bg-local bg-center bg-cover bg-opacity-70'> {/* Centrar el formulario y aplicar imagen de fondo */}
			<a
				href="/"
				className='text-red-500 absolute z-50 top-0 left-0  ml-5 mt-4 border-2 border-red-500 rounded-full p-1 hover:text-red-700 hover:border-red-700  shadow-md block  xl:hidden shadow-black'
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
					<path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
					<path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
				</svg>


			</a>
			<a
				href="/"
				className='text-red-500 absolute z-50 top-0 left-0  ml-5 mt-4 border-2 border-red-500 rounded-full px-3 py-1 hover:text-red-700 hover:border-red-700 shadow hidden xl:block shadow-black'
			>
				Inicio
			</a>
			<div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md"> {/* Ajustar el ancho y la opacidad del contenedor del formulario */}
				<h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
