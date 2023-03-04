import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import hotelplaceholder from "../assets/hotel-placeholder.jpg"
export default function Suggestions() {
    return (
        <div className={"container setFlex"}>
            <div className={"row"}>
            {
                hList.map((hotel) => (
                    <div className="col-sm">
                    <div className="card hotel-card">
                        <img className={"card-img-top hotel-card-img"} src={hotelplaceholder} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{hotel.name}</h5>
                            <p className="card-text">Some quick example  text to build on the card title and make up the bulk of
                                the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
const hList = [
    {
        name: 'monstera',
        category: 'classique',
        id: '1ed',
        isBestSale: true
    },
    {
        name: 'ficus lyrata',
        category: 'classique',
        id: '2ed',
        isBestSale: false
    },
    {
        name: 'pothos argenté',
        category: 'classique',
        id: '3ed',
        isBestSale: true
    }
]
