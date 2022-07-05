import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Arrow from "../../../../../img/icons/Arrow_right.png";
import { animate, motion } from "framer-motion"
import { useAnimation } from 'framer-motion';


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
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                        <div className='send'>
                        <img src={Arrow} title="MozeLogo" className='w-100'/>
                        </div>
                    </motion.label>
                    <input type="submit" id="upload-button" style={{display: 'none'}}/>
                </Col>
            </Row>
            </form>
       </Container>
        );
    }
    
    export default Starting;