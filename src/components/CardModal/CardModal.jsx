import { useContext } from "react";
import { CardModalContext } from "../../context/CardModalContext";

function CardModal(props) {
    //const modalShow = true;
    //let cssShowHide = modalShow && modalShow === true ? "modal show-modal" : "modal hide-modal";
    const {modalCardId, modalCardWord, setModalCardWord, modalCardDesc, setModalCardDesc} = useContext(CardModalContext);

    return (
        <div className="modal fade" id="cardModalContainer" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role={"document"}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>#{modalCardId}</p>
                        <p>{modalCardWord}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => {console.log('Save changes...');}}>Save changes</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardModal;