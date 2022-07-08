import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import btnleft from "../../../../../img/icons/Sort.png";
import btnmid from "../../../../../img/icons/Vector.png";
import { animate, motion } from "framer-motion"
import { useAnimation } from 'framer-motion';

const Starting: React.FC<{}> = () => {
    return(
        <section className='footerApp'>
            <Row>
                <Col className='d-flex  align-items-center'>
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                    <div className='send'>
                    <img src={btnleft} title="MozeLogo" className='footerIcon'/>
                    </div>
                    </motion.label>
                    <input type="submit" id="upload-button" style={{display: 'none'}}/>
                </Col>
                
                <Col className='d-flex  align-items-center'>
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                        <div className='send'>
                        <img src={btnmid} title="MozeLogo" className='footerIcon'/>
                        </div>
                    </motion.label>
                    <input type="submit" id="upload-button" style={{display: 'none'}}/>
                </Col>
                
                <Col className='d-flex  align-items-center'>
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                        <div className='send'>
                        <img src={btnleft} title="MozeLogo" className='footerIcon'/>
                        </div>
                    </motion.label>
                    <input type="submit" id="upload-button" style={{display: 'none'}}/>
                </Col>

            </Row>
        </section>
        );
    }
    
    export default Starting;