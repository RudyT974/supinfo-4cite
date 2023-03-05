import React from 'react';
import logo from "../assets/akkor_logo.png";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput} from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import axios from "axios";

export default function Connexion() {

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <div className="divider d-flex align-items-center my-4">
                        <img className="text-center" style={{ width: '18vw' , margin : 'auto'}} src={logo}/>
                    </div>
                </MDBCol>

                <MDBCol col='4' md='6'>
                    <MDBInput wrapperClass='mb-4' label='Mail' id='mail' type='email' size="lg"/>
                    <MDBInput wrapperClass='mb-4' label='Mot de passe' id='mdp' type='password' size="lg"/>
                    <div className="alert alert-warning nodisplay err-mdp" role="alert">
                        Le mot de passe n'est pas assez fort
                    </div>
                    <div className="alert alert-warning nodisplay err-logs" role="alert">
                        Identifiant ou mot de passe incorrect!
                    </div>
                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className='w-100 mb-4' size='md' onClick={connect}>Valider</MDBBtn>
                        <p className="small mt-2 pt-1 mb-2">Pas encore de compte ? <Link to={"/Inscription"}>Inscription</Link></p>
                    </div>

                </MDBCol>

            </MDBRow>
        </MDBContainer>
    );
}

function connect(){
    document.getElementsByClassName('err-mdp')[0].style.display = "none";
    document.getElementsByClassName('err-logs')[0].style.display = "none";
    var mail = document.getElementById('mail').value;
    var mdp = document.getElementById('mdp').value;
    login(mail, mdp);
}
export const login = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    try {
        const res = await axios.post('http://localhost:3000/login', body);
        localStorage.setItem("token", res.data)
        window.location.replace("/profil")
    } catch (error) {
        if (typeof error.response === "undefined") {
            return "error";
        }

        const err = JSON.parse(error.response.request.responseText);
        if(err.message[0] === "password is not strong enough") {
            document.getElementsByClassName('err-mdp')[0].style.display = "block";
        }
        if(err.message === "Wrong password"){
            document.getElementsByClassName('err-logs')[0].style.display = "block";
        }
    }
}