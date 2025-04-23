import CardReport from "../components/CardReport";
const reportPage = () => {
    const informes = [
        {
            urlImagen: 'src/assets/images/report/imagen_informe.png',
            direccion: 'carrera con calle',
            fecha: '23/08/2025',
            hora: '2:00 pm',
        },
        {
            urlImagen: 'src/assets/images/report/imagen_informe.png',
            direccion: 'carrera con calle',
            fecha: '23/08/2025',
            hora: '2:00 pm',
        }
    ]

    return (
        <div>
            <h1 className="text-center font-bold text-5xl text-white py-5">Informes</h1>
            <p className="mx-10 text-white text-center pb-3 text-xl">Descarga en formato PDF los informes de todos los servicios realizados en tu propiedad, con detalles completos para tu control y referencia.</p>
            <div className="max-w-[1280px] mx-auto bg-gray-400 min-h-screen rounded-xl">
                <div className="">
                    <CardReport
                        key='1'
                        urlImagen='/src/assets/images/report/imagen_informe.png'
                        direccion='carrera con calle'
                        fecha='23/08/2025'
                        hora='2:00 pm' />
                </div>

            </div>
        </div>
    )
}

export default reportPage;