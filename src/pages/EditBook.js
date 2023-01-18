import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Loading } from "../components/Loading";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";

const EditBook = (props) => {

    const dispatch = useDispatch();
    const { categoriesState, booksState } = useSelector((state) => state);
    const params = useParams();
    console.log("params", params);
    const navigate = useNavigate();


    // const [categories, setCategories] = useState(null);
    const [bookname, setBookname] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [category, setCategory] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const searchedBook = booksState.books.find(
            (item) => item.id == params.bookId
        );
        if (searchedBook === undefined) {
          navigate("/");
          return;
        }
        setBookname(searchedBook.name);
        setAuthor(searchedBook.author);
        setIsbn(searchedBook.isbn);
        setCategory(searchedBook.categoryId);
        // axios
        //     .get(`http://localhost:3004/books/${params.bookId}`)
        //     .then((res) => {
        //         console.log(res.data);
        //         setBookname(res.data.name);
        //         setAuthor(res.data.author);
        //         setIsbn(res.data.isbn);
        //         setCategory(res.data.categoryId);
        //         // axios
        //         //     .get("http://localhost:3004/categories")
        //         //     .then((res) => {
        //         //         setCategories(res.data);
        //         //     })
        //         //     .catch((err) => console.log(err));
        //     })
        //     .catch((err) => console.log(err))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowModal(true);

    };

    const editBook = () => {
        if (bookname === "" || author === "" || category === "") {
            alert("Book Name, Author and Category cannot be empty");
            return;
        }
        const updatedBook = {
            id:Number(params.bookId),
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
                dispatch({ type: "EDIT_BOOK", payload: updatedBook })
                setShowModal(false);
                navigate("/");
            })
            .catch((err) => console.log("edit error", err))
    }

    if (categoriesState.success !== true || booksState.success !== true) {
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
                                    categoriesState.categories.map((cat) => {
                                        return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button onClick={() => navigate("/")} type="button" className="btn btn-outline-danger w-25 mx-2">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary w-25">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            {
                showModal === true && (
                    <Modal
                        explain="Do you want to add this item?"
                        title="Edit Book"
                        onCancel={() => setShowModal(false)}
                        onConfirm={() => editBook()}
                    />
                )
            }
        </div>
    );
};


export default EditBook;