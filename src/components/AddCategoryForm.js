import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const { categoriesState } = useSelector((state) => state);

    useEffect(() => {
        document.title = "Library -  Add Category"
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (categoryName === "") {
            alert("Category name cannot be empty!");
            return;
        }
        const hasCategory = categoriesState.categories.find(
            item => item.name.toLowerCase() === categoryName.toLowerCase()
        );
        if (hasCategory !== undefined) {
            alert("This category is already exist!")
            return
        }
        const newCategory = {
            id : new Date().getTime,
            name : categoryName
        }
        axios.post("http://localhost:3004/categories", newCategory)
            .then(res => {
                console.log(res.data)
                dispatch({type:"ADD_CATEGORY", payload : newCategory});
                navigate("/categories")
            })
            .catch((err)=>console.log("addCategoryErr", err))
    }

    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                        Category name
                    </label>
                    <input
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-50">
                        Kaydet
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategoryForm; 