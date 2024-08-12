const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");
const { error } = require("console");

// const createPost = async (req, res, next) => {
//     try {
//         let { title, category, description } = req.body;
//         if (!title || !category || !description || !req.files) {
//             return next(new HttpError("Fill in all fields and choose thumbnail/", 422))
//         }
//         const { thumbnail } = req.files;
//         if (thumbnail.size > 2000000) {
//             return next(new HttpError("thumbnail is too big", 422))
//         }
//         let filename = thumbnail.name;
//         let splittedFilename = filename.split('.')
//         let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length-1]
//         thumbnail.mv(path.join(__dirname, "..", "/uploads", newFilename), asynk(error) => {
//     if (error) {
//         return next(new HttpError(error))
//     } else {
//         const newPost = await Post.create({
//             title, category, description,
//             thumbnail: newFilename, creator: req.user.id
//         })
//         if (!newPost) {
//             return next(new HttpError("Post couldn't be created", 422))
//         }
//         const currentUser = await User.findById(req.user.id);
//         const userPostCount = currentUser.posts + 1;
//     }

//         })
//     } catch (error) {
//         return next(new HttpError(error))
//     }
// }

const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Fill in all fields and choose a thumbnail", 422)
      );
    }

    const { thumbnail } = req.files;

    if (thumbnail.size > 2000000) {
      return next(new HttpError("Thumbnail is too big", 422));
    }

    let filename = thumbnail.name;
    let splittedFilename = filename.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];

    // Corrected async syntax
    thumbnail.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (error) => {
        if (error) {
          return next(new HttpError(error));
        }

        // Creating the new post
        const newPost = await Post.create({
          title,
          category,
          description,
          thumbnail: newFilename,
          creator: req.user.id,
        });

        if (!newPost) {
          return next(new HttpError("Post couldn't be created", 422));
        }

        // Updating user post count
        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser.posts + 1;
        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

        res.status(201).json(newPost);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getCatPosts = async (req, res, next) => {
  const { category } = req.params;
  const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
  res.status(200).json(catPosts);
};

const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, category, description } = req.body;

    // Check for required fields
    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all fields correctly", 422));
    }

    // Find the old post
    const oldPost = await Post.findById(postId);
    if (!oldPost) {
      return next(new HttpError("Post not found", 404));
    }

    // Check if the user is authorized to edit the post
    if (req.user.id !== oldPost.creator.toString()) {
      return next(new HttpError("Unauthorized", 403));
    }

    // Handle file upload and update
    if (!req.files) {
      // If no new file is uploaded, just update the post data
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );

      if (!updatedPost) {
        return next(new HttpError("Post couldn't be updated", 422));
      }

      return res.status(200).json(updatedPost);
    } else {
      // If a new file is uploaded, handle file replacement
      const { thumbnail } = req.files;

      if (thumbnail.size > 2000000) {
        // Adjust the size limit as needed
        return next(new HttpError("Thumbnail is too big", 422));
      }

      // Delete old thumbnail file
      fs.unlink(
        path.join(__dirname, "..", "uploads", oldPost.thumbnail),
        async (err) => {
          if (err) {
            return next(new HttpError(err.message));
          }

          // Rename and move the new thumbnail file
          const fileName = thumbnail.name;
          const splittedFilename = fileName.split(".");
          const newFileName =
            splittedFilename[0] +
            uuid() +
            "." +
            splittedFilename[splittedFilename.length - 1];

          thumbnail.mv(
            path.join(__dirname, "..", "uploads", newFileName),
            async (err) => {
              if (err) {
                return next(new HttpError(err.message));
              }

              // Update post with new thumbnail
              const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { title, category, description, thumbnail: newFileName },
                { new: true }
              );

              if (!updatedPost) {
                return next(new HttpError("Post couldn't be updated", 422));
              }

              res.status(200).json(updatedPost);
            }
          );
        }
      );
    }
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post unavailable", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;
    if (req.user.id == post.creator) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Post.findByIdAndDelete(postId);
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          }
        }
      );
      res.json(`Post ${postId} deleted successfully!`);
    } else {
      return next(new HttpError("Post couldn't be deleted"));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
