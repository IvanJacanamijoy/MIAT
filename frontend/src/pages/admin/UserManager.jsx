import UserFilterForm from "../../components/UserFilterForm/UserFilterForm";
import fondo1 from "../../assets/images/home/imagen_fondo_servicios.png";

const UserManager = () => {

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[500px] object-cover opacity-90"
          alt="Fondo eléctrico"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl">
            Gestion Usuarios
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl max-w-4xl mx-auto">
            Aquí puede ver todos los usuarios del sistema. Para cada uno, encontrará los detalles.
          </p>
        </div>
      </div>
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10">

        <UserFilterForm />

      </div>
    </div>
  );
}

export default UserManager;