import { useContext } from "react";
import { CardModalContext } from "../../context/CardModalContext";
import { CardsContext } from "../../context/CardsContext";

function CardModalTags(){
    const {modalCardTagIds, setModalCardTagIds, tagNamesNewValue, setTagNamesNewValue} = useContext(CardModalContext);
    const {tagsData} = useContext(CardsContext);

    if (!modalCardTagIds && !tagsData) return null;

    return (
        <div className="modal-body tags-box">
            <div className="d-flex align-items-center">
                <div className="mr-2 container">
                    <div className="d-inline-flex">
                        {
                            tagsData ? [...tagsData].map(rec => {
                                return (
                                    <div className="mx-2" key={rec.id}>
                                        <input className="form-check-input me-1" type="checkbox" id={`formchecklabelid-${rec.id}`}
                                            onChange={(e) => {
                                                if(e.target.checked){
                                                    setModalCardTagIds([...modalCardTagIds, rec.id]);
                                                } else {
                                                    setModalCardTagIds(modalCardTagIds.filter(r => r !== rec.id));
                                                }
                                            }}
                                            checked={modalCardTagIds.includes(rec.id) ? true : false}
                                        />
                                        <label className="form-check-label" htmlFor={`formchecklabelid-${rec.id}`}>{rec.tagName}</label>
                                    </div>
                                );
                            }) : null
                        }
                    </div>
                </div>
                <div className="mr-2 container">
                    <div className="row">
                        <input value={tagNamesNewValue} type="text" placeholder="New tags (CSV)"
                            className="form-control fon-size-smaller margin-top-10"
                            onChange={(e) => {
                                setTagNamesNewValue(e.target.value);
                            }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardModalTags;