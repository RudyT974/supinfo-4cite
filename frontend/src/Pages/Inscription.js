import React from 'react';
import "../styles/Inscription.css";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

export default function Inscription() {
    return (
        <MDBContainer fluid className='my-5' >

            <MDBRow className='g-0 align-items-center container' style={{margin : "auto"}}>
                <MDBCol col='6'>

                    <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5">Inscription</h2>

                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Prénom' id='form1' type='text'/>
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Nom' id='form2' type='text'/>
                                </MDBCol>
                            </MDBRow>

                            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'/>
                            <MDBInput wrapperClass='mb-4' label='Mot de passe' id='form4' type='password'/>

                            <MDBBtn className='w-100 mb-4' size='md'>Valider</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

