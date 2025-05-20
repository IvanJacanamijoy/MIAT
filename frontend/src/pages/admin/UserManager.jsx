import UserFilterForm from "../../components/UserFilterForm/UserFilterForm";
const UserManager = () =>{
    return (
        <div className="h-full w-full bg-gray-500">
            <h1>Gestion Usuarios</h1>
            <div>
                    <UserFilterForm/>

            </div>
        </div>
    );
}

export default UserManager;