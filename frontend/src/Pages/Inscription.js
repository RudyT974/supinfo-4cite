import React from 'react';
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

export default function Inscription() {
    return (
        <MDBContainer fluid className='my-5' >
            <MDBRow className='g-0 align-items-center container' style={{margin : "auto", width :  "65vw"}}>
                <MDBCol col='6'>
                    <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <h2 className="fw-bold mb-5">Inscription</h2>
                            <MDBInput wrapperClass='mb-4' label='Pseudo' id='form3' type='email'/>
                            <MDBInput wrapperClass='mb-4' label='Email' id='mail' type='text'/>
                            <MDBInput wrapperClass='mb-4' label='Mot de passe' id='form4' type='password'/>
                            <MDBBtn className='w-100 mb-4' size='md' onClick={register}>Valider</MDBBtn>
                            <div className="alert alert-success nodisplay" role="alert">
                               <p>Compte créé avec succès</p>
                                <Link to={"/Connexion"}>Me connecter</Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
function register(){
    var mail = document.getElementById('mail').value;
    var mdp = document.getElementById('form4').value;
    var username = document.getElementById('form3').value;
    postRegister(username, mail, mdp);
}

export const postRegister = async (username, email, password) => {
    const body = {
        username : username,
        email: email,
        password: password
    }
    try {
        const res = await axios.post('http://localhost:3000/register', body);
        if(res.status == "201"){
            document.getElementsByClassName('nodisplay')[0].style.display = "block";
        }
    } catch (err) {
      //  var rep = (JSON.parse(err.response.request.responseText));
        throw new Error("L'utilisateur existe déjà");
    }
}