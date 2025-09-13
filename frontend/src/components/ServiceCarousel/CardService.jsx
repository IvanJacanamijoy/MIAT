import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CardService = ({ titulo, descripcion, imageUrl, textoBoton = "Agendar" }) => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const handleAgendarClick = () => {
    if (usuario) {
      // Si ya está autenticado → ir directo a visitas técnicas con form abierto
      navigate("/visitastecnica", { state: { openForm: true } });
    } else {
      // Si no está autenticado → primero al login
      navigate("/login", {
        state: { from: "/visitastecnica", openForm: true },
      });
    }
  };

  return (
    <div className="bg-white w-72 rounded-xl shadow-lg overflow-hidden duration-300 hover:shadow-xl mx-auto h-full">
      <div className="h-full flex flex-col">
        {/* Imagen */}
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={titulo}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="p-10 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-2xl text-center font-bold mb-3">{titulo}</h3>
            <p className="mb-3">{descripcion}</p>
          </div>
          <button
            onClick={handleAgendarClick}
            className="px-5 py-4 bg-red-500 hover:bg-red-700 text-white rounded-lg mx-auto cursor-pointer"
          >
            {textoBoton || "Agendar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardService;

