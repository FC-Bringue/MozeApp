import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Arrow from "../../../../../img/icons/Arrow_right.png";
import { animate, motion } from "framer-motion"
import { useAnimation } from 'framer-motion';
import { useCookies } from "react-cookie";




const Pseudo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pseudo = useSelector((state: any) => state.login.pseudo);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [name, setUsername] = useState('')
    const [token, setuserToken] = useState('')

   


    function handleCookie() {
        setCookie("user", name, {
          path: "/"
        });
        

      }
      function handleRemoveCookie() {
        removeCookie("user");
      }
   
      function addPseudo(){
        handleRemoveCookie();
        handleCookie();
        let r = (Math.random() + 1).toString(36).substring(7);
        console.log(    r);
        navigate('acceuil')
    }

      {console.log(name)}
    return(
        <>
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
                            <input type="search" name="name" className='name' placeholder='Ex : xX_jf_Xx' onChange={event => setUsername(event.target.value)}/>
                               
                        </label> 
                       
  

                </Col>
            </Row>
            <Row>
                <Col className='text-center'>
                    <motion.label  whileHover={{scale: 1.2}} initial={{scale: 1}}>
                        <div className='send'  onClick={addPseudo} >
                            <img src={Arrow} title="MozeLogo" className='w-100'/>
                        </div>
                    </motion.label>
                </Col>
            </Row>
            </form>
       </Container>
       </>
        );
    }
    
    export default Pseudo;
