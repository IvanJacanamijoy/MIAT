import UserFilterForm from "../../components/UserFilterForm/UserFilterForm";
import UserForm from "../../components/UserFilterForm/UserForm";
import { useState } from "react";

const UserManager = () => {

  return (
    <div className="h-full w-full  max-w-7xl mx-auto px-5 pb-5 relative">
      <h1 className="text-center font-bold text-5xl py-10 text-red-500">Gestion Usuarios</h1>
      <div className="p-5 bg-neutral-500 rounded-2xl">
        <UserFilterForm />
      </div>
    </div>
  );
}

export default UserManager;