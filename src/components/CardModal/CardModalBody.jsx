import { useContext } from "react";
import { CardModalContext } from "../../context/CardModalContext";

function CardModalBody(){
    const {modalCardWord, setModalCardWord, modalCardDesc, setModalCardDesc} = useContext(CardModalContext);

    return (
        <div className="modal-body">
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <div className="rec-word">
                            <label>Word</label>
                            <input type="text" className="form-control" autoFocus placeholder="new word" value={modalCardWord} onChange={(e) => {setModalCardWord(e.target.value);}}/>
                        </div>
                    </div>
                    <div className="col-md-12">
                    <div className="rec-desc">
                            <label>Description</label>
                            <input type="text" className="form-control" placeholder="new description" value={modalCardDesc} onChange={(e) => {setModalCardDesc(e.target.value);}}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CardModalBody;