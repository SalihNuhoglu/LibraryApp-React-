import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Loading } from "../components/Loading";


const EditBook = (props) => {
    const params = useParams();
    console.log("params", params);
    const navigate = useNavigate();

    const [categories, setCategories] = useState(null);
    const [bookname, setBookname] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3004/books/${params.bookId}`)
            .then((res) => {
                console.log(res.data);
                setBookname(res.data.name);
                setAuthor(res.data.author);
                setIsbn(res.data.isbn);
                setCategory(res.data.categoryId);
                axios
                    .get("http://localhost:3004/categories")
                    .then((res) => {
                        setCategories(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (bookname === "" || author === "" || category === "") {
            alert("Book Name, Author and Category cannot be empty");
            return;
        }
        const updatedBook = {
            id: params.bookId,
            name: bookname,
            author: author,
            categoryId: category,
            isbn: isbn,
        };
        console.log("updatedBook", updatedBook);
        axios
            .put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => console.log("edit error", err))
    };

    if (categories === null) {
        return <Loading />;
    }

    return (
        <div >
            <Header />
            <div className="container my-5" >
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <input type="text"
                                className="form-control"
                                placeholder="Book Name"
                                value={bookname}
                                onChange={(event) => setBookname(event.target.value)}
                            />
                        </div>
                        <div className="col">
                            <input type="text"
                                className="form-control"
                                placeholder="Author Name"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col">
                            <input type="text"
                                className="form-control"
                                placeholder="ISBN"
                                value={isbn}
                                onChange={(event) => setIsbn(event.target.value)}
                            />
                        </div>
                        <div className="col">
                            <select className="form-select"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}>
                                <option value={""} selected>
                                    Select a category
                                </option>
                                {
                                    categories.map((cat) => {
                                        return <option value={cat.id}>{cat.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button onClick={()=> navigate("/")} type="button" className="btn btn-outline-danger w-25 mx-2">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary w-25">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditBook;