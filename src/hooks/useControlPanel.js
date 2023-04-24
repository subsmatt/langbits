import { useState } from "react";

function useControlPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("");

    return {
        searchQuery, setSearchQuery, searchType, setSearchType
    };
}

export default useControlPanel;