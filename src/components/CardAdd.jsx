function CardAdd(props){
    const {insertRecord} = props;

    return (
        <div>
            <button className="btn btn-secondary" onClick={() => insertRecord()}>Add new card <i className="fa fa-plus"></i></button>
        </div>
    );
}

export default CardAdd;