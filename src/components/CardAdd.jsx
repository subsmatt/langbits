import { CardModalContext } from "../context/CardModalContext";
import { useContext } from "react";

function CardAdd(props){
    const {insertRecord} = props;
    const {setModalCardId, setModalCardWord, setModalCardDesc} = useContext(CardModalContext);

    function createCard(){
        setModalCardId(0);
        setModalCardWord("sms");
        setModalCardDesc("description");

        const loCardModal = new bootstrap.Modal('#cardModalContainer', {
            keyboard: false
        });
        loCardModal.show();
    }

    return (
        <div>
            <button className="btn btn-secondary" onClick={() => createCard()}>Add new card <i className="fa fa-plus"></i></button>
        </div>
    );
}

export default CardAdd;