import { useState } from "react";

function useCardModal() {
    const [modalShow, setModalShow] = useState(false);
    const [modalCardId, setModalCardId] = useState(0);
    const [modalCardWord, setModalCardWord] = useState("");
    const [modalCardDesc, setModalCardDesc] = useState("");
    const [modalCardWordType, setModalCardWordType] = useState("");
    const [tagNamesNewValue, setTagNamesNewValue] = useState("");
    const [modalCardTagIds, setModalCardTagIds] = useState([]);

    return {
        modalShow, setModalShow,
        modalCardId, setModalCardId,
        modalCardWord, setModalCardWord,
        modalCardDesc, setModalCardDesc,
        modalCardWordType, setModalCardWordType,
        tagNamesNewValue, setTagNamesNewValue,
        modalCardTagIds, setModalCardTagIds
    };
}

export default useCardModal;