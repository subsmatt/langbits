import Card from "./Card";
import { sampleData } from "../data/sampleData";

function CardList(){
    const data = sampleData;

    return (
        <div className="row">
            {data.map(
                function(rec) {
                    return(
                        <Card key={rec.id} rec={rec} />
                    );
                }
            )}
        </div>
    );
}

export default CardList;