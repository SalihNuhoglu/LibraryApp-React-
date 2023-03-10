import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";
import {Link} from "react-router-dom";

const ListCategories = () => {

    const { categoriesState } = useSelector((state) => state);
    console.log("catState", categoriesState);

    useEffect(()=>{
        document.title="Library - Categories";
    }, [])

    if (categoriesState.success !== true) {
        return <Loading />;
    }
    return (
        <div className="container my-5">
            <div className="my-3 d-flex justify-content-end">
                <Link to="/add-category" className="btn btn-primary">
                    Add a category
                </Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Category Name</th>
                        <th className="text-center" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoriesState.categories.map((category) => {
                            return (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td className="text-center">
                                        <div className="btn-group" role="group" >
                                            <button type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => {
                                                    // setShowModal(true);
                                                    // setBookToBeRemoved(book.id);
                                                    // setDeletedBookName(book.name);
                                                }}>
                                                Delete
                                            </button>
                                            <Link to={`edit-category/${category.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            {/* {showModal === true && (
        <Modal
            explain={` Are you sure to delete ${deletedBookName}?`}
            title={deletedBookName}
            onConfirm={() => deleteBook(bookToBeRemoved)}
            onCancel={() => setShowModal(false)}
        />
    )} */}
        </div>
    )
};

export default ListCategories; 