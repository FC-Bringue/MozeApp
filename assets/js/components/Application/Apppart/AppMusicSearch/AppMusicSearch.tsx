import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UpVote from "../../../../../img/icons/upvote.png";
import search from "../../../../../img/icons/search.png";
import { animate, motion } from "framer-motion"
import { useAnimation } from 'framer-motion';
import Footer  from '../footer/footer';
import MozeLogo from "../../../../../img/logos/MOZE.png";
import MusicPlayer  from '../MusicPlayer/MusicPlayer';


const Starting: React.FC<{}> = () => {
    return(
        <div className='appMusicSearh'>
            <Container>
                <Row>
                    <Col className='text-center'>
                        <form className='d-flex align-items-center'>
                            <input type={'search'} placeholder='titre de musique' className='m-5 search'/>
                            <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                                <div className='send'>
                                <img src={search} title="search" className='w-100'/>
                                </div>
                            </motion.label>
                            <input type="submit" id="upload-button" style={{display: 'none'}} />
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <span>veuillez entrer le titre d'une musique pour afficher les resultats</span>
                    </Col>
                </Row>
            </Container>
           
        <MusicPlayer />
        <Footer/>
        </div>
        );
    }
    
    export default Starting;