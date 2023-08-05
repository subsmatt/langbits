import { CardModalContext } from "../context/CardModalContext";
import { CardsContext } from "../context/CardsContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

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

    const tempId = uuidv4();

    function CardTagsSection() {
        return (
            <div className="d-flex">
                {
                    cardTags.map(cardTag => {
                        
                        return (
                            <div key={cardTag.id}>
                                <span className="textbox-tag small">
                                    {cardTag.tagName}&nbsp;
                                    <a href="#" className="text-decoration-none fa me-2" onClick={() => {
                                        const tagIdsForCard = cardTags.filter(r => r.tagId !== cardTag.tagId).map(t => t.tagId);
                                        updateCard(rec, undefined, cardPinned, cardImportant, tagIdsForCard, undefined);
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
                <div className="card-title d-flex flex-row justify-content-between mb-0">
                    <h5 className="ms-2">{rec.word}</h5>
                    <a href="#" className="me-2" onClick={() => { updateCard(rec, undefined, !cardPinned, cardImportant); }}>
                        <i className={
                            cardPinned ? "float-right fas fa-thumbtack fa-lg text-info"
                            : "float-right fas fa-thumbtack fa-rotate-90"
                        }></i>
                    </a>
                </div>
                <div className="card-body py-2">
                    <div className="mb-2">{rec.desc}</div>
                    {/* <div className="my-1">
                        <b>{rec.type}</b>{" "}{rec.tags.toString()}
                    </div> */}
                    <div className="">
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