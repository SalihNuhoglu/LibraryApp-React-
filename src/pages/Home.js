import React, {useEffect} from "react";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";

const Home = (props) => {
    useEffect(()=>{
        document.title ="Library";
     },[]);
    return (
        <div >
            <Header />
            <ListBooks />
        </div>
    );
};


export default Home;