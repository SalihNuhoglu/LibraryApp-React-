import React from "react";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";

export const Home = (props) => {
    return (
        <div >
            <Header />
            <ListBooks />
        </div>
    );
}