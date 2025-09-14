import Modal from "./Common/Modal";
import VisitForm from "./TechnicalVisitsFilterForm/VisitForm";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
const ButtonTechnicalVisits = () => {
    const [showModal, setShowModal] = useState(false);
    const {usuario} = useAuth();
    const handleOpenModal = (usuario) => {
        // setSelectedVisit(visit);
        // setModalType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // setModalType('');
        // setSelectedVisit(null);
    };
    return (

        <>
            <button className="block m-auto bg-red-500 py-3 px-8 rounded-2xl mb-2 hover:bg-red-700" onClick={() => handleOpenModal(usuario.nombre)}>
                Agendar Visita Técnica
            </button>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <VisitForm />
            </Modal>
        </>
    );
}

export default ButtonTechnicalVisits;