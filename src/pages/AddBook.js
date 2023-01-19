import React , {useEffect} from "react";
import Header from "../components/Header";
import AddBookForm from "../components/AddBookForm";


const AddBook = ()=>{

useEffect(()=>{
   document.title ="Library - Add-book";
},[]);

    return(
        <div>
          <Header/>
          <AddBookForm />
        </div>
    )
};

export default AddBook;