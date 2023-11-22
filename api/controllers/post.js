const Post = require("../models/post");

//create post
const createPost = async (req, res) => {
  const { title, body } = req.body;
  const image = req.file.path.replace(/\\/g, "/");
  if (!title || !body) {
    return res.status(422).json({ error: "please inter all the fields" });
  }
  try {
    const post = new Post({
      title,
      body,
      image,
      createdBy: req.user,
    });
    post.save();
    res.status(201).json(post);
    console.log(req.user.name);
  } catch (error) {
    console.log(error);
  }
};
// get all post

const getAllPosts = async (req, res) => {
  await Post.find()
    .populate("createdBy", "name pic name")
    .then((posts) => {
      res.status(201).send(posts);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(req.user);
};

const getSinlePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (post) {
    res.status(201).send(post);
  } else {
    res.status(404).send({ message: "Post not fund" });
  }
};

//user posts
const userPosts = async (req, res) => {
  try {
    const mypost = await Post.find({ createdBy: req.user._id }).populate(
      "createdBy",
      "pic name"
    );
    res.status(201).json({ mypost });
  } catch (error) {
    res.status(401).json({ error: "no post maching the id" });
  }
};

//update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete post

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//like aDN DISLIKE post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  userPosts,
  getSinlePost,
};
