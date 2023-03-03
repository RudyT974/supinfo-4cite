import React from 'react';
import allo from "../assets/connexion.jpg";
import logo from "../assets/akkor_logo.png";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";

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


                    <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="lg"/>
                    <MDBInput wrapperClass='mb-4' label='Mot de passe' id='formControlLg' type='password' size="lg"/>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className="mb-0 px-5" size='lg'>Se connecter</MDBBtn>
                        <p className="small mt-2 pt-1 mb-2">Pas encore de compte ? <Link to={"/Inscription"}>Inscription</Link></p>
                    </div>

                </MDBCol>

            </MDBRow>
        </MDBContainer>
    );
}

