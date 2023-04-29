import { useState } from "react";

function useCardModal() {
    const [modalShow, setModalShow] = useState(false);
    const [modalCardId, setModalCardId] = useState(0);
    const [modalCardWord, setModalCardWord] = useState("");
    const [modalCardDesc, setModalCardDesc] = useState("");
    const [modalCardWordType, setModalCardWordType] = useState("");

    return {
        modalShow, setModalShow,
        modalCardId, setModalCardId,
        modalCardWord, setModalCardWord,
        modalCardDesc, setModalCardDesc,
        modalCardWordType, setModalCardWordType
    };
}

export default useCardModal;