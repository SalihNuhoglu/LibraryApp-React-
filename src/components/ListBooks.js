import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { Loading } from "./Loading";
import Modal from "./Modal";

const ListBooks = (props) => {


    const [books, setBooks] = useState(null);
    const [categories, setCategories] = useState(null);
    const [didUpdate, setDidUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bookToBeRemoved, setBookToBeRemoved] = useState(null);
    const [deletedBookName,setDeletedBookName] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3004/books")
            .then(resBook => {
                console.log(resBook);
                setBooks(resBook.data);
                axios.get("http://localhost:3004/categories")
                    .then(resCat => {
                        setTimeout(() => {
                            setCategories(resCat.data);
                        });

                    })
                    .catch((err) => console.log("categories err", err));
            })
            .catch((err) => console.log("books err", err));
    }, [didUpdate]);

    const deleteBook = (id) => {
        console.log(`http://localhost:3004/books/${id}`);
        axios
            .delete(`http://localhost:3004/books/${id}`)
            .then((res) => {
                console.log("delete res", res);
                setDidUpdate(!didUpdate);
            })
            .catch((err) => console.log(err));
    };


    if (books === null || categories === null) {
        return <Loading />;
    }


    return (
        <div className="container my-5">
            <div className="my-3 d-flex justify-content-end">
                <Link to="/add-book" className="btn btn-primary">
                    Add a book
                </Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Book Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                        <th className="text-center" scope="col">ISBN</th>
                        <th className="text-center" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => {
                            const category = categories.find(
                                (cat) => cat.id === book.categoryId)
                            return (
                                <tr key={book.id}>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{category.name}</td>
                                    <td className="text-center">{book.isbn === "" ? "-" : book.isbn}</td>
                                    <td>
                                        <div className="btn-group" role="group" >
                                            <button type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setBookToBeRemoved(book.id);
                                                    setDeletedBookName(book.name);
                                                }}>
                                                Delete
                                            </button>
                                            <Link to={`edit-book/${book.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            {showModal === true && (
                <Modal 
                    explain= {` Are you sure to delete ${deletedBookName}?`}
                    title={deletedBookName}
                    onConfirm={() => deleteBook(bookToBeRemoved)}
                    onCancel={()=> setShowModal(false)}
                />
            )}
        </div>

    );
};

export default ListBooks;