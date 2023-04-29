function WordType(props){
    const {incShowAll, currentValue, eventHandler} = props;
    
    if (incShowAll === true) {
        return (
            <select className="form-select" aria-label="Word type" onChange={(event) => eventHandler(event.target.value)}>
                <option defaultValue={""} value="">All words</option>
                <option value="noun">Nouns</option>
                <option value="verb">Verbs</option>
                <option value="adjective">Adjectives</option>
                <option value="pronoun">Pronouns</option>
                <option value="adverb">Adverbs</option>
                <option value="unknown">Unknown</option>
            </select>
        );
    }

    return (
        <select className="form-select" aria-label="Word type" value={currentValue} onChange={(event) => eventHandler(event.target.value)}>
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="adjective">Adjective</option>
            <option value="pronoun">Pronoun</option>
            <option value="adverb">Adverb</option>
            <option value="unknown">Unknown</option>
        </select>
    );
}

export default WordType;