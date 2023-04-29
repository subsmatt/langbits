import {CardModalContext} from "../context/CardModalContext";
import { CardContext, CardProvider } from "../context/CardContext";
import { useContext } from "react";
import CardFamiliar from "./CardFamiliar";

function Card(props) {
    const {rec, deleteRecord, updateRecord} = props;
    const {setModalShow, setModalCardId, setModalCardWord, setModalCardDesc, setModalCardWordType} = useContext(CardModalContext);

    function updateCard(aoRec){
        setModalCardId(aoRec.id);
        setModalCardWord(aoRec.word);
        setModalCardDesc(aoRec.desc);
        setModalCardWordType(aoRec.type);
        setModalShow(true);
    }

    function deleteCard(id){
        if (confirm("Delete card?") === true) deleteRecord(id);
    }

    return (
        <CardProvider rec={rec} updateRecord={updateRecord} deleteRecord={deleteRecord}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 my-4" key={rec.id}>
                <div className={`card p-2`}>
                    <div className="card-title">
                        <h5>{rec.word}</h5>
                    </div>
                    <div className="card-body">
                        <span>{rec.desc}</span>
                        <div className="my-1">
                            <b>{rec.type}</b>{" "}{rec.tags.toString()}
                        </div>
                        <CardFamiliar/>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <div>{rec.type}</div>
                        <div>
                            <span className="mx-2">
                                <a href="#" onClick={() => {updateCard(rec);}}>
                                    <i className="fa fa-edit"/>
                                </a>
                            </span>
                            <span className="mx-2">
                                <a href="#" onClick={() => {deleteCard(rec.id);}}>
                                    <i className="fa fa-trash"/>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>            
        </CardProvider>
    );
}

export default Card;