import { useState, useContext } from "react";
import { CardsContext } from "../context/CardsContext";

function CardFamiliar(props){
    const [inTransition, setInTransition] =  useState(false);
    const {updateCard} = useContext(CardsContext);
    const {rec} = props;
    function doneCallback(){
        //console.log(`CardFamiliar:doneCallback ${new Date().getMilliseconds()}`);
        setInTransition(false);
    }

    return (
        <div className="oCardFavorite d-flex justify-content-between">
            <span>Familiar {inTransition ? (<i className="fas fa-question fa-spin"></i>) : (<i className="fa fa-question"></i>)}</span>            
            <i className={rec.familiar ? "fa-solid fa-star" : "fa-regular fa-star"} onClick={function() {
                setInTransition(true);
                updateCard({...rec, familiar: !rec.familiar}, doneCallback);
            }}></i>
        </div>
    );
}

export default CardFamiliar;