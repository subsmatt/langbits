import {CardModalContext} from "../context/CardModalContext";
import { useContext } from "react";

function Card(props) {
    const {rec, deleteRecord, updateRecord} = props;
    const {setModalShow, setModalCardId, setModalCardWord, setModalCardDesc} = useContext(CardModalContext);

    function updateCard(id, word, desc){
        setModalCardId(id);
        setModalCardWord(word);
        setModalCardDesc(desc);
        setModalShow(true);
    }

    function deleteCard(id){
        if (confirm("Delete card?") === true) deleteRecord(id);
    }

    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 my-4" key={rec.id}>
            <div className={`card p-2`}>
                <div className="card-title">
                    <h5>{rec.word}</h5>
                </div>
                <div className="card-body">
                    <span>{rec.desc}</span>
                    <div className="my-1">
                        {/* <b>{rec.type}</b>{" "}{rec.tags.toString()} */}
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <div>{rec.type}</div>
                    <div>
                        <span className="mx-2">
                            <a href="#" onClick={() => {updateCard(rec.id, rec.word, rec.desc);}}>
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
    );
}

export default Card;