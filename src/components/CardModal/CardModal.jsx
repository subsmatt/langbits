import { useContext } from "react";
import { CardModalContext } from "../../context/CardModalContext";
import CardModalHeader from "./CardModalHeader";
import CardModalFooter from "./CardModalFooter";
import CardModalBody from "./CardModalBody";
import CardModalTags from "./CardModalTags";

function CardModal(props) {
    const {modalShow} = useContext(CardModalContext);
    let cssShowHide = modalShow && modalShow === true ? "modal show-modal d-block" : "modal hide-modal";
    let cssBackdropShowHide = modalShow && modalShow === true ? "fade modal-backdrop show" : "";

    return (
        <>
            <div role="dialog" className={cssShowHide} id="cardModalContainer">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <CardModalHeader />
                        <CardModalBody />
                        <CardModalTags />
                        <CardModalFooter />
                    </div>
                </div>
            </div>
            <div className={cssBackdropShowHide} id="cardModalBackdrop"></div>
        </>
    );
}

export default CardModal;