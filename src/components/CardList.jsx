import {ControlPanelContext} from "../context/ControlPanelContext";
import { CardsContext } from "../context/CardsContext";
import { useContext } from "react";
import Card from "./Card";

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

    // Select 'Pinned' cards, so that they can be displayed at the top of the page
    const cardsPinned = cardAttributesData.filter(rec => rec.pinned === 1)
    .map(rec => rec.cardId);

    // Sort records
    function sortByDesc(a, b) {
        return a.desc < b.desc ? -1 : a.desc > b.desc ? 1 : 0;
    }

    return (
        <>
            {/* Display 'Pinned' cards */}
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

            {/* Display horizontal line to separate 'Pinned' and 'Unpinned' cards */}
            {cardsPinned.length > 0 ? <hr/> : null}

            {/* Display 'Unpinned' cards */}
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