import {ControlPanelContext} from "../context/ControlPanelContext";
import { CardsContext } from "../context/CardsContext";
import { createContext, useContext } from "react";
import Card from "./Card";
import CardAdd from "./CardAdd";
import useRestRequest, {REQUEST_STATUS} from "../hooks/useCards";
import CardModal from "./CardModal/CardModal";



function CardList() {
    const {searchQuery, searchType} = useContext(ControlPanelContext);

    const {
        cardsData, 
        cardsDataError, 
        cardAttributesData, 
        cardAttributesDataError, 
        createCard, 
        updateCard, 
        deleteCard
    } = useContext(CardsContext);
        
    // Show Error and abort if loading failed
    if ( !(cardsData && cardAttributesData)) {
        return (
            <div className="text-center text-info my-5">
                INFO: <b>No data found.</b>
            </div>
        );
    }

    const cardsPinned = cardAttributesData.filter(rec => rec.pinned === 1)
    .map(rec => rec.cardId);

    function sortByDescLength(a, b){
        const descA = a.desc ? a.desc.length : 0;
        const descB = b.desc ? b.desc.length : 0;

        return descA > descB ? -1 : descA < descB ? 1 : 0;
    }

    function sortByDesc(a, b) {
        return a.desc < b.desc ? -1 : a.desc > b.desc ? 1 : 0;
    }

    return (
        <>
            {cardsData && <CardModal />}
            <CardAdd/>
            <div className="row">
                {cardsData.filter(n => cardsPinned.includes(n.id))
                    .filter(function(rec){
                        if (Object.hasOwn(rec, "word") && rec.word !== null 
                         && Object.hasOwn(rec, "desc") && rec.desc !== null
                         && Object.hasOwn(rec, "type") && (searchType === "" || rec.type === searchType)
                        ) {
                            return rec.word.toLowerCase().includes(searchQuery) || rec.desc.toLowerCase().includes(searchQuery);
                        } else {
                            return false;
                        }
                    }).sort(sortByDesc).map(function(rec){                        
                        return (
                            <Card key={rec.id} rec={rec} />
                        );
                    })
                }
            </div>
            {cardsPinned.length > 0 ? <hr/> : null}
            <div className="row">
                {cardsData.filter(n => !cardsPinned.includes(n.id))
                    .filter(function(rec){
                        if (Object.hasOwn(rec, "word") && rec.word !== null 
                         && Object.hasOwn(rec, "desc") && rec.desc !== null
                         && Object.hasOwn(rec, "type") && (searchType === "" || rec.type === searchType)
                        ) {
                            return rec.word.toLowerCase().includes(searchQuery) || rec.desc.toLowerCase().includes(searchQuery);
                        } else {
                            return false;
                        }
                    }).sort(sortByDesc).map(function(rec){                        
                        return (
                            <Card key={rec.id} rec={rec} />
                        );
                    })
                }
            </div>
        </>
    );
}

export default CardList;