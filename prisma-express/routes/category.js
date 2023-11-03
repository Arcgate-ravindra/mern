const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const prisma = require("../utils/prisma")();

//CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    let { name, postId } = req.body;
    console.log(name, postId, typeof(postId))
    const newCategory = await prisma.category.create({
      data: {
        name: name.toUpperCase(),
        postId,
      },
    });
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err);
  }
});

// //DELETE
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS
router.get("/getall", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      distinct: ['name'],
      select : {
        id : true,
        name : true,
      }
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
