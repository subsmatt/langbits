import { useState } from "react";

function useControlPanel() {
    const [searchQuery, setSearchQuery] = useState("");

    return {
        searchQuery, setSearchQuery
    };
}

export default useControlPanel;