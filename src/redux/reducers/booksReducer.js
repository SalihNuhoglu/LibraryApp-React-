const initialState = {
    start: false,
    success: false,
    books: [],
    fail: false,
    errorMessage: ""
}

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_BOOKS_START":
            return {
                ...state,
                start: true,
            }
        case "FETCH_BOOKS_SUCCESS":
            return {
                ...state,
                start: false,
                success: true,
                books: action.payload,
            }
        case "FETCH_BOOKS_FAIL":
            return {
                ...state,
                start: false,
                fail: true,
                errorMessage: action.payload,
            }
        case "ADD_BOOK":
            return {
                ...state,
                books: [...state.books, action.payload],
            }
        case "DELETE_BOOK":

            const filteredBooks = state.books.filter(
                (item) => item.id !== action.payload
            );
            return {
                ...state,
                books: filteredBooks
            }
        case "EDIT_BOOK":
            //1. extract editedbook's currentstate from array
            //2. Add updated current version to array
            const filteredBooksEdit = state.books.filter(
                (item) => item.id !== action.payload.id
            )
            return {
                ...state,
                books:[action.payload, ...filteredBooksEdit]
            }
        default:
            return state
    };
};



export default booksReducer;