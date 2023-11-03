const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const prisma = require("../utils/prisma")();

//UPDATE
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: req.body,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.category.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.post.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json("User has been deleted!");
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

//GET USER
router.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const { password, ...info } = user;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
