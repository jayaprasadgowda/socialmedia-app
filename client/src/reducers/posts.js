import { Switch } from "@mui/material"

export default (posts = [], action) => {
    switch(action.type){



        case 'DELETE':
            case 'LIKE':
            return posts.filter((post) => post._id !== action.payload);
        case 'UPDATE':
            return posts.map((post) => post._id == action.payload._id ? action.payload : post);
        case 'FETCH_ALL':
            return action.payload;//post action->app.js to here
            case 'CREATE':
                return [...posts, action.payload];
                default:
                    return posts;
    }
}