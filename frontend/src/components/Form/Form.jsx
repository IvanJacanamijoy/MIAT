import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Form = ({ onSubmit, styles, inputs, error, isLoading, buttonText = 'Enviar' }) => {

    return (
        <>
            <form onSubmit={onSubmit} className={styles} method='POST'>
                {inputs.map((input, index) => (
                    <div key={index} className="mb-4">
                        <label htmlFor={input.label} className="block text-md font-semibold text-gray-700">
                            {input.label}
                            <div className='relative mt-1'>

                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {index == 1 ? <LockClosedIcon className="h-5 w-5 text-gray-400" /> : <EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                                </div>
                                <input
                                    type={input.type}
                                    id={input.label}
                                    value={input.value}
                                    onChange={input.onChange}
                                    placeholder={input.placeholder}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
                                    disabled={input.disabled}
                                />
                            </div>
                        </label>
                    </div>
                ))}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <span className=' block mt-2'>¿No tiene una cuenta? <a href="/register" className='text-blue-600 hover:underline-offset-1'>Registrarse</a></span>
                <div className="flex space-x-4">

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        {buttonText}
                    </button>
                    <a
                        href='/register'
                        className="border border-black text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
                        Registrarse
                    </a>
                </div>
            </form>
        </>

        //     <div>
        //         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
        //         <div className="relative">
        //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        //                 <EnvelopeIcon className="h-5 w-5 text-gray-400" />
        //             </div>
        //             <input
        //                 type="email"
        //                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
        //                 id="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 placeholder="Ingresa tu email"
        //                 disabled={isLoading}
        //             />
        //         </div>
        //     </div>

        //     <div>
        //         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        //         <div className="relative">
        //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        //                 <LockClosedIcon className="h-5 w-5 text-gray-400" />
        //             </div>
        //             <input
        //                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
        //                 type="password"
        //                 id="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 placeholder="Ingresa tu contraseña"
        //                 disabled={isLoading}
        //             />
        //         </div>
        //     </div>
        //     {error && (
        //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        //             <strong className="font-bold">Error: </strong>
        //             <span className="block sm:inline">{error}</span>
        //         </div>
        //     )}

        //     {/* <div className="flex items-center justify-between">
        //         <div className="flex items-center">
        //             <input
        //                 id="remember-password"
        //                 name="remember-password"
        //                 type="checkbox"
        //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        //             />
        //             <label htmlFor="remember-password" className="ml-2 block text-sm text-gray-700">
        //                 Recordar contraseña
        //             </label>
        //         </div>

        //         <div className="text-sm">
        //             <a href="#" className="font-medium text-black hover:text-blue-500">
        //                 Olvidé mi contraseña
        //             </a>
        //         </div>
        //     </div> */}

        //     <div className="flex space-x-4">
        //         <button className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        //             Ingresar
        //         </button>
        //         <a
        //             className="border border-black text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors
        //         ">
        //             Registrarse
        //         </a>
        //     </div>
        // </form >
    )
}

export default Form;