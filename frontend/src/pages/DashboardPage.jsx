import { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout"
const DashboardPage = () => {
    const [rol, setRol] = useState('');
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioLogueado = localStorage.getItem('usuario');
        if (!usuarioLogueado) {
            navigate('/');
        }
        else {
            const usuario = JSON.parse(usuarioLogueado);
            setRol(usuario.rol);
            setNombre(usuario.nombre);
        }

    }, [navigate]);

    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-lg mb-8">
                    Bienvenido al Dashboard {rol} {nombre}
                </p>

            </div>
        </MainLayout>
    );
};

export default DashboardPage;