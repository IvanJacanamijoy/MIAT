import Modal from "./common/Modal";
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
            <button className="block m-auto bg-red-700/80 py-2 px-5 rounded-2xl mb-2 hover:bg-red-700" onClick={() => handleOpenModal(usuario.nombre)}>
                Agendar Visita Técnica
            </button>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <VisitForm />
            </Modal>
        </>
    );
}

export default ButtonTechnicalVisits;