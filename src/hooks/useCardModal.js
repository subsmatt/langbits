import { useState } from "react";

function useCardModal() {
    //const [modalShow, setModalShow] = useState(false);
    const [modalCardId, setModalCardId] = useState(0);
    const [modalCardWord, setModalCardWord] = useState("");
    const [modalCardDesc, setModalCardDesc] = useState("");

    return {
        //modalShow, setModalShow,
        modalCardId, setModalCardId,
        modalCardWord, setModalCardWord,
        modalCardDesc, setModalCardDesc
    };
}

export default useCardModal;