import {CardModalContext} from "../context/CardModalContext";
import { CardContext, CardProvider } from "../context/CardContext";
import { useContext } from "react";
import CardFamiliar from "./CardFamiliar";
import { CardsContext } from "../context/CardsContext";

function Card(props) {
    const {rec} = props;
    const {
        setModalShow, 
        setModalCardId, 
        setModalCardWord, 
        setModalCardDesc, 
        setModalCardWordType,
        setModalCardTagIds,
        setTagNamesNewValue
    } = useContext(CardModalContext);

    const {
        cardsData, 
        cardAttributesData,
        tagsData,
        tagOnCardData, 
        deleteCard, 
        updateCard
    } = useContext(CardsContext);

    function editCard(aoRec){
        setModalCardId(aoRec.id);
        setModalCardWord(aoRec.word);
        setModalCardDesc(aoRec.desc);
        setModalCardWordType(aoRec.type);
        setModalCardTagIds(tagOnCardData.filter(r => r.cardId === aoRec.id).map(t => t.tagId));
        setTagNamesNewValue("");
        setModalShow(true);
    }

    function removeCard(id){
        if (confirm("Delete card?") === true) deleteCard(id);
    }

    const cardAttributes = cardAttributesData 
        ? cardAttributesData.find(ca => ca.cardId === rec.id) 
        : {cardPinned: 0, cardImportant: 0};

    const cardPinned = cardAttributes?.pinned === 1 ? true : false; 
    const cardImportant = cardAttributes?.important === 1 ? true : false;

    const tagsDataDictionary = tagsData
        ? Object.fromEntries(tagsData.map(({id, tagName}) => [id, tagName]))
        : [];

    const cardTags = tagOnCardData
        ? tagOnCardData.filter(r => r.cardId === rec.id).map(r => {
            return {
                ...r,
                tagName: tagsDataDictionary[r.tagId]
            };
        })
        : [];

    function CardTagsSection() {
        return (
            <div className="row margin-left-right-15">
                {
                    cardTags.map(cardTag => {
                        return (
                            <div key={cardTag.id}>
                                <span className="textbox-tag">
                                    {cardTag.tagName}&nbsp;
                                    <a href="#" className="text-decoration-none" onClick={() => {
                                        const tagIdsForCard = cardTags.filter(r => r.tagId !== cardTag.tagId).map(t => t.tagId);
                                        updateCard(rec, undefined, undefined, undefined, tagIdsForCard, undefined);
                                    }}>{" "}<i className="icon fa fa-times-circle"></i></a>{" "}
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 my-4" key={rec.id}>
            <div className={`card p-2`}>
                <div className="card-title">
                    <h5>{rec.word}</h5>
                    <a href="#" onClick={() => { updateCard(rec, undefined, !cardPinned, cardImportant); }}>
                        <i className={
                            cardPinned ? "float-right fas fa-thumbtack fa-lg text-info"
                            : "float-right fas fa-thumbtack fa-rotate-90"
                        }></i>
                    </a>
                </div>
                <div className="card-body">
                    <span>{rec.desc}</span>
                    <div className="my-1">
                        <b>{rec.type}</b>{" "}{rec.tags.toString()}
                    </div>
                    <CardFamiliar rec={rec}/>
                    <div className="margin-top-10">
                        <CardTagsSection />
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <div>{rec.type}</div>
                    <div>
                        <span className="mx-2">
                            <a href="#" onClick={() => {editCard(rec);}}>
                                <i className="fa fa-edit"/>
                            </a>
                        </span>
                        <span className="mx-2">
                            <a href="#" onClick={() => {removeCard(rec.id);}}>
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