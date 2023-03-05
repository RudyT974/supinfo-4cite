
import hotelplaceholder from "../assets/hotel-placeholder.jpg"
import axios from "axios";
import {useEffect} from "react";
import {Link} from "react-router-dom";
export default function Suggestions() {
    useEffect(() => {
        if(isConnected()){
            getHotels();
        }
    });
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
                            <p className="card-text">{hotel.desc}</p>
                            <p className="card-text">{hotel.location}</p>

                            <Link to={"/hotel/" + hotel.id} className="btn btn-primary">Réserver</Link>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
let hList = [
]
function isConnected(){
    var token = localStorage.getItem("token");
    if(token === null || token === "disconnected"){
        return false;
    }
    return true;

}

async function getHotels(){
    console.log("searching");
    var token = localStorage.getItem("token");
    const config = {
        headers:{
            Authorization: "Bearer " + token,
        }
    };
    try {
        const res = await axios.get('http://localhost:3000/hotels/', config);
        hList = [];
        var array = (JSON.parse(res.request.responseText));
        for (var i = 0; i < array.length; i++) {
            var hotel = array[i];
            hList.push({
                id : hotel.id,
                name : hotel.name,
                desc : hotel.description,
                location : hotel.location
            })
        }
        console.log(hList);

    } catch (err) {
        console.error(err);
    }
}