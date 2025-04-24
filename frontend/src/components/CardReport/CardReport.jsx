const CardReport = ({ urlImagen, direccion, fecha, hora }) => {
    return (
        <div className="grid grid-cols-2 max-w-[1000px] bg-white rounded-2xl mx-auto mt-3">
            <img src={urlImagen} alt="imagen de referencia" className="my-auto ml-3"/>
            <div className="p-5 flex flex-col">
                <h2 className="font-bold text-lg mb-2">Servicio Mantenimiento de Redes</h2>
                <div className="border-2 border-gray-200 p-5 rounded-md">
                    <h3 className="font-semibold text-xl">Datos importantes</h3>
                    <p>{direccion}</p>
                    <p>Fecha: {fecha}</p>
                    <p>Hora: {hora}</p>
                </div>
                    <button className="bg-red-600 px-2 py-4 text-white font-semibold text-xl rounded-md w-[200px] mx-auto mt-3">Descargar informe</button>
            </div>
        </div>
    )
}

export default CardReport;