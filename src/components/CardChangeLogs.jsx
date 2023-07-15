import { useContext, useState } from "react";
import { CardsContext } from "../context/CardsContext";

function CardChangeLogs(){
    const {cardsData, cardChangeLogsData} = useContext(CardsContext);
    const [selectedCardId, setSelectedCardId] = useState("-1");
    const cardChangeLogsSelected = cardChangeLogsData.filter(rec => rec.cardId === selectedCardId);

    function dateOut(dateValue){
        return new Date(dateValue).toLocaleTimeString("en", {
            year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
        });
    }

    function CardListBase(){
        return (
            <div className="col-6">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Word</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...cardsData].map(function(card){
                            return (
                                <tr key={card.id} className={card.id === selectedCardId ? "table-primary" : ""} onClick={() => {console.log(`select card id[${card.id}]`);setSelectedCardId(card.id);}}>
                                    <td>{card.word}</td>
                                    <td>{card.desc}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    function CardListDetails(){
        return (
            <div className="col-6">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Operation</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...cardChangeLogsSelected].map(function(log){
                            return (
                                <tr key={log.id}>
                                    <td>{log.operation}</td>
                                    <td>{log.changeDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <CardListBase />
                <CardListDetails />
            </div>
        </div>
    );
}

export default CardChangeLogs;