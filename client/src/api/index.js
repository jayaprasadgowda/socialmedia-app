import axios from 'axios';

const url = 'http://localhost:5000/posts';
//step3 
export const fetchPosts = () => axios.get(url);
//redux action,reducr creatd

//post operation post

export const createPost = (newPost) => axios.post(url, newPost);//go to actons

//update
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);//go to actions

//delte
export const deletePost = (id) =>axios.delete(`${url}/${id}`);//go to actions
//like
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);