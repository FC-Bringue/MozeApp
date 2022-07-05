import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MozeLogo from "../../../../../img/logos/MOZE.png";

const Starting: React.FC<{}> = () => {
    return(
       <Container className='SessionName'>
            <Row>
                <Col className='text-center'>
                    <h2 className='p-5'> Bienvenue </h2>
                </Col>
            </Row>
            <form>
            <Row>
                <Col className='text-left'>

                       <label className='d-grid'>  
                            <span>Pseudo :</span>                                         
                            <input type="text" name="name" className='name' placeholder='Ex : xX_jf_Xx'/>
                        </label> 
                    
  

                </Col>
            </Row>
            <Row>
                <Col className='text-center'>
                    <input type="submit" value="Envoyer" />
                </Col>
            </Row>
            </form>
       </Container>
        );
    }
    
    export default Starting;