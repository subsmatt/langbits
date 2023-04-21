import { useContext } from "react";
import { CardModalContext } from "../../context/CardModalContext";

function CardModalHeader(){
    const {modalCardId, setModalShow} = useContext(CardModalContext);

    return (
        <div className="modal-header">
            <h5 className="modal-title">{modalCardId === 0 ? "Create" : "Edit"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {setModalShow(false);}}></button>
        </div>
    );
}

export default CardModalHeader;