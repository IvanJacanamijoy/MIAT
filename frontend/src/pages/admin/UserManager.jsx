import UserFilterForm from "../../components/UserFilterForm/UserFilterForm";
import UserForm from "../../components/UserFilterForm/UserForm";

const UserManager = () => {
  return (
    <div className="h-full w-full bg-gray-300 max-w-7xl mx-auto px-5">
      <h1 className="text-center font-bold text-5xl py-10 text-white">Gestion Usuarios</h1>
      <div className="p-5 bg-neutral-500 rounded-2xl">
        <div className="space-y-6">
          {/* <UserForm userToEdit={userToEdit} onSubmit={handleCreateOrUpdateUser} onCancel={handleCancelEdit} /> */}
          <UserFilterForm/>
        </div>

      </div>
    </div>
  );
}

export default UserManager;