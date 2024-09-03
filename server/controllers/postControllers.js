const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')
    


// Create a Post
// POST: api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;

        // Check for required fields
        if (!title || !category || !description || !req.files || !req.files.thumbnail) {
            return next(new HttpError("Fill in all fields and choose a thumbnail.", 422));
        }

        const { thumbnail } = req.files;

        // Check the file size (thumbnail should be less than 2MB)
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2MB.", 422));
        }

        // Create a unique filename for the thumbnail
        const fileExtension = path.extname(thumbnail.name); // Get the file extension
        const newFilename = `${uuid()}${fileExtension}`; // Generate a unique name with extension

        // Move the thumbnail to the uploads directory
        const uploadPath = path.join(__dirname, '..', 'uploads', newFilename);
        thumbnail.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError("Failed to upload thumbnail.", 500));
            }

            // Create the new post
            const newPost = new Post({
                title,
                category,
                description,
                thumbnail: newFilename,
                creator: req.user.id
            });

            await newPost.save();

            // Update the user's post count
            await User.findByIdAndUpdate(req.user.id, { $inc: { posts: 1 } });

            res.status(201).json(newPost);
        });
    } catch (error) {
        return next(new HttpError("Failed to create the post. Please try again.", 500));
    }
};

// get post 
// GET: api/posts
//UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
        
    } catch (error) {
        return next(new HttpError(error))
        
    }
  
}

// get single post 
// GET: api/posts/:id
//UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) {
            return next(new HttpError("Post not Found", 404))
        }
        res.status(200).json(post)
        
    } catch (error) {
        return next(new HttpError(error))
        
    }
   
}

// get posts by category 
// GET: api/posts/categories/:category
//UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
    return next(new HttpError(error))
    
    }
}


// get author post 
// GET: api/posts/users/:id
//UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
        
    }
}


// edit post 
// PATCH: api/posts/:id
//PROTECTED
const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFilename;
        let updatedPost;
        const postId = req.params.id;
        let {title, category, description} = req.body;

        if(!title || !category || description.length <12) {
            return next(new HttpError("Fill in all fields.", 422))
        }
     //get old post from database
            const oldPost = await Post.findById(postId);
            if(req.user.id == oldPost.creator){
                if(!req.files){
                    updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
                } else{
            
            //delete old thumnail from uploada
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err)=> {
                if(err){
                    return next(new HttpError (err))
                }
                
                    
                
            })
            //upload new thumbnail
            const {thumbnail} = req.files;
            //check the file size
            if(thumbnail.size> 2000000){
                return next(new HttpError("Thumbnail too big. Should be less than 20mb"))
            }
            fileName = thumbnail.name;
            let splittedFilename = fileName.split('.')
            newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length -1]
            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) =>{
                if(err){
                    return next(new HttpError(err))

                }                
            })

            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFilename}, {new:true})

        }
    }

        if(!updatedPost){
            return next(new HttpError("Couldn't update post.", 400))
        }
        res.status(200).json(updatedPost)
        
    } catch (error) {
        return next(new HttpError(error))
        
    }
}

// delete a post 
// DELETE: api/posts/:id
//PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if(!postId){
            return next(new HttpError("Post unavailable.", 400))
        }
        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;
        if(req.user.id == post.creator) {
        //delete thumnbail from upload folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async(err)=>{
            if(err){
                return next(new HttpError(err))
            }else {
                await Post.findByIdAndDelete(postId);
                // find user and reduce post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount =  currentUser?.posts -1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                res.json(`Port ${postId} deleted sucessfully.`)
            }
        })
    } else {
        return next(new HttpError("Post couldnt be deleted.", 403))
    }
        
        
    } catch (error) {
        return next(new HttpError(error))
        
    }
}


module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost}