import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";
//step2
export const getPosts = async (req, res) => {
   try{
    const postMessages = await PostMessage.find();
    console.log(postMessages)

    res.status(200).json(postMessages)
   } catch(error){
    res.status(404).json({ message: error.message});

   }
}
//http status code
export const createPost = async (req, res) => {
    
    const post = req.body;

    const newPost = new PostMessage(post);

    try{
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message:error.message });


    }
}
//update
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with this id');

    {}

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new:true });
    res.json(updatedPost);
}
// delete post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id');

    await PostMessage.findByIdAndRemove(id);
    console.log('delete')
    res.json({ message: 'Post deleted successfully' });//go to mfromt end->api

}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true })


    res.json(updatedPost);
   
}