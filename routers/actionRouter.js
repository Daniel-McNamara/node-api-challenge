const express = require("express");

const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Actions.get();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Actions.get(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: error });
  }
});

router.post("/:id", validateProjectId, async (req, res) => {
  try {
    const newAction = { ...req.body, project_id: req.params.id };
    const data = await Actions.insert(newAction);
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Actions.remove(req.params.id);
    res.status(200).json(removed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Actions.update(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
});

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (!project) {
        res.status(400).json({ message: "invalid project id" });
      } else {
        req.project = project;
        next();
      }
    })
    .catch(err => console.log(err));
}

module.exports = router;