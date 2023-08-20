import { CardModalContext } from "../context/CardModalContext";
import { useContext } from "react";

function CardAdd(){
    const {
        setModalShow, 
        setModalCardId, 
        setModalCardWord, 
        setModalCardDesc, 
        setModalCardWordType, 
        setTagNamesNewValue,
        setModalCardTagIds
    } = useContext(CardModalContext);

    function createCard(){
        setModalCardId(0);
        setModalCardWord("");
        setModalCardDesc("");
        setModalCardWordType("noun");
        setModalShow(true);
        setTagNamesNewValue("");
        setModalCardTagIds([]);
    }

    return (
        <button className="btn btn-secondary" onClick={() => createCard()}>Add card <i className="fa fa-plus"></i></button>
    );
}

export default CardAdd;