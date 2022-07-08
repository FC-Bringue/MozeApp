import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import btnleft from "../../../../../img/icons/Sort.png";
import btnmid from "../../../../../img/icons/Vector.png";
import btnright from "../../../../../img/icons/profil.png";
import { animate, motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

const Starting: React.FC<{}> = () => {
    const navigate = useNavigate();
    return(
        <section className='footerApp w-100'>
            <Row>
                <Col className='d-flex  align-items-center'>
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                        <div id="navigate-Acceuil" onClick={async () => { navigate("acceuil")}}>
                            <img src={btnleft} title="MozeLogo" className='footerIcon'/>
                        </div>
                    </motion.label>
                </Col>
                
                <Col className='d-flex  align-items-center'>
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                        <div>
                        <img src={btnmid} title="MozeLogo" className='footerIcon'/>
                        </div>
                    </motion.label>
                    <input type="submit" id="upload-button" style={{display: 'none'}}/>
                </Col>
                
                <Col className='d-flex  align-items-center'>
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                         <div id="navigate-Profile" onClick={async () => { navigate("profile")}}>
                            <img src={btnright} title="MozeLogo" className='footerIcon'/>
                        </div>
                    </motion.label>
                </Col>

            </Row>
        </section>
        );
    }
    
    export default Starting;