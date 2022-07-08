import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import profil from "../../../../../img/icons/TallProfil.png";
import Arrow from "../../../../../img/icons/Arrow_right.png";
import { animate, motion } from "framer-motion"
import { useAnimation } from 'framer-motion';
import Footer  from '../footer/footer';
import MusicPlayer  from '../MusicPlayer/MusicPlayer';


const Profile = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const pseudo = useSelector((state: any) => state.login.pseudo);
        const [cookies, setCookie, removeCookie] = useCookies(["user"]);
        const [title, setUsername] = useState('')
    
       
    
    
        function handleCookie() {
            setCookie("user", title, {
              path: "/"
            });
          }
          function handleRemoveCookie() {
            removeCookie("user");
          }
       
          function addPseudo(){
            handleRemoveCookie();
            handleCookie();
        }
    return(
            <>
                <div className='AppProfile'>
                    <Container className='Session'>
                        <Row className='d-flex align-items-center'>
                            <Col className='p-4 text-center'>
                                <img src={profil} title="MozeLogo" className='w-50'/>
                                 <p>{cookies.user}</p>
                            </Col>
                        </Row>
                        <Row>
                            <span>changer le pseudo :</span>     
                        </Row>
                        <Row>
                            <Col className='d-flex align-items-center'>
                                                                    
                                <input type="search" name="name" className='name' placeholder='Ex : xX_jf_Xx' onChange={event => setUsername(event.target.value)}/>
                                <div className='send ms-3'  onClick={addPseudo} >
                                    <img src={Arrow} title="MozeLogo" className='w-100'/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <MusicPlayer />
                <Footer/>
            </>

        );
    }

    
    export default Profile;