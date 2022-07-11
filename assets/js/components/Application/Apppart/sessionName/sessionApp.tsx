
import React,{useState,useEffect}from"react";
import Form from "./sessionName";
import Loader from'./Loader';

function App(){
  const[loader,setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        setLoader(false);
    }, 1500);
    }, []);

    return loader?(
    <Loader/>
    ) : (
    <Form/>
    );
}
export default App