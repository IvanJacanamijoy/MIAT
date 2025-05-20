import CardReport from "../../components/CardReport";
const reportPage = () => {
    const informes = [
        {
            id:1,
            urlImagen: 'src/assets/images/report/imagen_informe.png',
            direccion: 'carrera con calle',
            fecha: '23/08/2025',
            hora: '2:00 pm'
        },
        {
            id:2,
            urlImagen: 'src/assets/images/report/imagen_informe.png',
            direccion: 'carrera con calle',
            fecha: '23/08/2025',
            hora: '2:00 pm'
        },
        {
            id:3,
            urlImagen: 'src/assets/images/report/imagen_informe.png',
            direccion: 'carrera con calle',
            fecha: '23/08/2025',
            hora: '2:00 pm'
        },
        {
            id:4,
            urlImagen: 'src/assets/images/report/imagen_informe.png',
            direccion: 'carrera con calle',
            fecha: '23/08/2025',
            hora: '2:00 pm'
        }
    ];

    return (
        <div className="
        relative 
        md:w-[945px] 
        lg:w-[1280px]
        max-w-full
        
        mx-auto
        bg-gray-800
        ">
            <div className="
            absolute
            inset-0
            bg-[url(src/assets/images/report/imagen_fondo.png)]
            bg-local 
            bg-cover
            bg-center
            h-[500px]
            w-auto
            ">
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full">
                <h1 className="text-center font-bold text-5xl text-white py-5">Informes</h1>
                <p className="mx-10 text-white text-center pb-3 text-xl">Descarga en formato PDF los informes de todos los servicios realizados en tu propiedad, con detalles completos para tu control y referencia.</p>
                <div className="w-[1000px] mx-auto bg-gray-400 rounded-xl py-4">
                    <div className="">
                        <CardReport
                            key='1'
                            urlImagen='/src/assets/images/report/imagen_informe.png'
                            direccion='carrera con calle'
                            fecha='23/08/2025'
                            hora='2:00 pm' />
                            { informes.map( ({id,direccion, fecha, hora}) => (
                                <CardReport
                                key={id}
                                urlImagen='/src/assets/images/report/imagen_informe.png'
                                direccion={direccion}
                                fecha={fecha}
                                hora={hora} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reportPage;