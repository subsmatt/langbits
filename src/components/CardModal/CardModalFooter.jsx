import { useContext } from "react";
import { CardModalContext } from "../../context/CardModalContext";

function CardModalFooter(props){
    const {setModalShow, modalCardId, setModalCardId, modalCardWord, setModalCardWord, modalCardDesc, setModalCardDesc} = useContext(CardModalContext);
    const {insertRecord, updateRecord} = props;
    
    function closeModal() {
        setModalCardId(0);
        setModalCardWord("");
        setModalCardDesc("");
        setModalShow(false);
    }

    return (
        <div className="modal-footer">
            {modalCardId === 0 && (
                <button type="button" className="btn btn-info" onClick={() => {
                    insertRecord({word: modalCardWord, desc: modalCardDesc});
                    closeModal();
                }}>Add</button>
            )}
            {modalCardId !== 0 && (
                <button type="button" className="btn btn-primary" onClick={() => {
                    updateRecord({id: modalCardId, word: modalCardWord, desc: modalCardDesc});
                    closeModal();
                }}>Save</button>
            )}
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {closeModal();}}>Close</button>
        </div>
    );
}

export default CardModalFooter;