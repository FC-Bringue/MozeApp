import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import UpVote from "../../../../../img/icons/upvote.png";
import { animate, motion } from "framer-motion"
import { useAnimation } from 'framer-motion';
import Footer  from '../footer/footer';
import MozeLogo from "../../../../../img/logos/MOZE.png";
import MusicPlayer  from '../MusicPlayer/MusicPlayer';


const Starting: React.FC<{}> = () => {
    const navigate = useNavigate();
    return(
        <div className='RunningSession'>
            <Container className='Session'>
                <Row className='d-flex align-items-center'>
                    <Col className='p-4 text-center'>
                        <img src={MozeLogo} title="MozeLogo" className='w-50'/>
                     </Col>
                </Row>
                <Row className='d-flex align-items-center text-center'>
                    <Col lg={9} sm={9} xs={9} className='title'>
                        <h3 className='w-80'>prochaine musiques</h3>
                    </Col>
                    <Col lg={3} sm={3} xs={3} className=''>
                        <button className='playlistBtn'  onClick={async () => { navigate("search")}}> Voir la playlist </button>
                    </Col>
                </Row>
                <Row>
                    <Col className=' musicListe'>
                        <ul>
                            <li>
                                <div className='MusicPlayerImageTitle d-flex align-items-center'>
                                    <img src={MozeLogo} title="MozeLogo" className='w-100'/>
                                    <div className='MusicPlayerInfo'>
                                        <span className='MusicPlayerTitle'>Beat It</span>
                                        <span className='MusicPlayerArtist'>Michael Jackson</span>
                                    </div>

                                    <div className='upVoteNbr ms-auto d-flex align-items-baseline'>
                                        
                                        <img src={UpVote} title="Upvote"/>
                                        <span className='p-2'>20</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='MusicPlayerImageTitle'>
                                    <img src={MozeLogo} title="MozeLogo" className='w-100'/>
                                    <div className='MusicPlayerInfo'>
                                        <span className='MusicPlayerTitle'>Beat It</span>
                                        <span className='MusicPlayerArtist'>Michael Jackson</span>
                                    </div>
                                    <div className='upVoteNbr ms-auto d-flex align-items-baseline'>
                                        
                                        <img src={UpVote} title="Upvote"/>
                                        <span className='p-2'>20</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='MusicPlayerImageTitle'>
                                    <img src={MozeLogo} title="MozeLogo" className='w-100'/>
                                    <div className='MusicPlayerInfo'>
                                        <span className='MusicPlayerTitle'>Beat It</span>
                                        <span className='MusicPlayerArtist'>Michael Jackson</span>
                                    </div>
                                    <div className='upVoteNbr ms-auto d-flex align-items-baseline'>
                                        
                                        <img src={UpVote} title="Upvote"/>
                                        <span className='p-2'>20</span>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </Col>
                </Row>
        </Container>
        
        <MusicPlayer />
        <Footer/>
       </div>
        );
    }
    
    export default Starting;