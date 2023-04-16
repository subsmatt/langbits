function Card(props) {
    const {rec} = props;

    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 my-4" key={rec.id}>
            <div className={`card p-2`}>
                <div className="card-title">
                    <h5>{rec.word}</h5>
                </div>
                <div className="card-body">
                    <span>{rec.desc}</span>
                    <div className="my-1">
                        {/* <b>{rec.type}</b>{" "}{rec.tags.toString()} */}
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <div>{rec.type}</div>
                    <div>
                        <span className="mx-2">
                            <a href="#" onClick={() => {alert('updateCard function...');}}>
                                <i className="fa fa-edit"/>
                            </a>
                        </span>
                        <span className="mx-2">
                            <a href="#" onClick={() => {alert('deleteCard function...');}}>
                                <i className="fa fa-trash"/>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;