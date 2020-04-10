const express = require("express");

const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Projects.get();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Projects.get(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: error });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const data = await Projects.getProjectActions(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Projects.insert(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Projects.remove(req.params.id);
    res.status(200).json(removed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Projects.update(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
});

module.exports = router;