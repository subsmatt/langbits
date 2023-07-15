import { useContext } from "react";
import { CardModalContext } from "../../context/CardModalContext";
import { CardsContext } from "../../context/CardsContext";

function CardModalFooter(){
    const {
        setModalShow, 
        modalCardId, 
        setModalCardId, 
        modalCardWord, 
        setModalCardWord, 
        modalCardDesc, 
        setModalCardDesc, 
        modalCardWordType, 
        setModalCardWordType,
        modalCardTagIds,
        tagNamesNewValue
    } = useContext(CardModalContext);
    
    const {createCard, updateCard} = useContext(CardsContext);
    
    function closeModal() {
        setModalCardId(0);
        setModalCardWord("");
        setModalCardDesc("");
        setModalCardWordType("");
        setModalShow(false);
    }

    return (
        <div className="modal-footer">
            {modalCardId === 0 && (
                <button type="button" className="btn btn-info" onClick={() => {
                    createCard({word: modalCardWord, desc: modalCardDesc, type: modalCardWordType}, modalCardTagIds, tagNamesNewValue);
                    closeModal();
                }}>Add</button>
            )}
            {modalCardId !== 0 && (
                <button type="button" className="btn btn-primary" onClick={() => {
                    updateCard({id: modalCardId, word: modalCardWord, desc: modalCardDesc, type: modalCardWordType}, undefined, undefined, undefined, modalCardTagIds, tagNamesNewValue);
                    closeModal();
                }}>Save</button>
            )}
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {closeModal();}}>Close</button>
        </div>
    );
}

export default CardModalFooter;