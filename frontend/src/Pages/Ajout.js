
import React, {useEffect} from 'react';
import "../styles/Inscription.css";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol,
}
    from 'mdb-react-ui-kit';
import axios from "axios";
import {Link} from "react-router-dom";
import jwtDecode from "jwt-decode";
export default function Ajout() {
    useEffect(() => {
        if(!isAdmin()){
            window.location.replace('/');
            throw new Error('Page interdite');
        }
    }, []);
    return (
        <MDBContainer fluid className='my-5' >
            <MDBRow className='g-0 align-items-center container' style={{margin : "auto", width :  "65vw"}}>
                <MDBCol col='6'>
                    <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <h2 className="fw-bold mb-5">Ajout d'un Hotêl</h2>
                            <MDBInput wrapperClass='mb-4' label='Nom' id='Nom' type='email'/>
                            <MDBInput wrapperClass='mb-4' label='Localisation' id='location' type='text'/>
                            <MDBInput wrapperClass='mb-4' label='Description' id='description' type='text'/>
                            <MDBBtn className='w-100 mb-4' size='md' onClick={register}>Valider</MDBBtn>
                            <div className="alert alert-success nodisplay" role="alert">
                                <p>Compte créé avec succès</p>
                                <Link to={"/Connection"}>Me connecter</Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
function register(){
    var nom = document.getElementById('Nom').value;
    var location = document.getElementById('location').value;
    var description = document.getElementById('description').value;
    addHotel(nom, location, description);
}

const addHotel = async (name, location, description) => {
    const body = {
        name : name,
        location: location,
        description: description
    }
    var token = localStorage.getItem("token");
    const config = {
        headers:{
            Authorization: "Bearer " + token,
        }
    };
    try {
        const res = await axios.post('http://localhost:3000/hotels', body, config);
    } catch (err) {
        console.error(err);
    }
}
function isAdmin(){
        var token = localStorage.getItem("token");
        if(token === null || token === "disconnected"){
            return false;
        }
        var decoded = jwtDecode(token);
        if(decoded.role === "admin"){
            return true;
        }
        return false;

}