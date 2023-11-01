const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const prisma = require("../utils/prisma")();

//CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = await prisma.post.create({
      data: req.body,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //UPDATE
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: req.body,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //DELETE
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST DETAILS
router.get("/get/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS
router.get("/getall", async (req, res) => {
  try {
    const search = req.query.search;
    let searchQuery = {};
    if (search) {
      searchQuery = {
        where: {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      };
    }
    const posts = await prisma.post.findMany(searchQuery);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER POSTS
router.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const posts = await prisma.post.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;