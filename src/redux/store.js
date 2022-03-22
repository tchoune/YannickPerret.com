import {createStore, applyMiddleware, combineReducers} from 'redux';
import blogListPosts from './reducer/BlogReducer';
import thunk from 'redux-thunk';
import blogPostArticle from './reducer/BlogAddPost';

const rootReducer = combineReducers({blogPost: blogListPosts, blogTag: blogPostArticle})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store