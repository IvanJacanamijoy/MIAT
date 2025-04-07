import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';


const Form = ({ action, styles }) => {
    return (
        <form action={action} className={styles}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
                        placeholder="correo@ejemplo.com"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="password"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-password"
                        name="remember-password"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-password" className="ml-2 block text-sm text-gray-700">
                        Recordar contraseña
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-black hover:text-blue-500">
                        Olvidé mi contraseña
                    </a>
                </div>
            </div>

            <div className="flex space-x-4">
                <button className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Ingresar
                </button>
                <button className="border border-black text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
                    Registrarse
                </button>
            </div>
        </form >
    )
}

export default Form;