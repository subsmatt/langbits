import { CardModalContext } from "../context/CardModalContext";
import { useContext } from "react";

function CardAdd(){
    const {setModalShow, setModalCardId, setModalCardWord, setModalCardDesc} = useContext(CardModalContext);

    function createCard(){
        setModalCardId(0);
        setModalCardWord("");
        setModalCardDesc("");
        setModalShow(true);
    }

    return (
        <div>
            <button className="btn btn-secondary" onClick={() => createCard()}>Add new card <i className="fa fa-plus"></i></button>
        </div>
    );
}

export default CardAdd;