import UserFilterForm from "../../components/UserFilterForm/UserFilterForm";

const UserManager = () => {

  return (
    <div className="relative">
    {/* pendiente - corregir error de la imagen */}
      <div
          className="
          absolute 
          inset-0 
          bg-[url(src/assets/images/home/imagen_fondo_servicios.png)] 
          bg-local 
          bg-center 
          bg-cover
          max-w-7xl
          mx-auto 
          h-[500px]
          "
        ></div>
      <div className="relative z-10 h-full w-full  max-w-7xl mx-auto px-5 pb-5 bg-linear-to-t from-gray-700 from-80% to-transparent">
        <h1 className="text-center font-bold text-5xl py-10 text-white">Gestion Usuarios</h1>
        <div className="p-5 bg-neutral-500 rounded-2xl">
          <UserFilterForm />
        </div>
      </div>
    </div>
  );
}

export default UserManager;