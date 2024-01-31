/**
 * @swagger
 * /api/follow_project:
 *   post:
 *     summary: Follow a project
 *     description: Follow a project by providing user_id and project_id
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User ID and Project ID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               description: User ID
 *             project_id:
 *               type: string
 *               description: Project ID
 *     responses:
 *       201:
 *         description: The user followed a new project successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Success message
 *       401:
 *         description: User does not exist
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 *             type:
 *               type: string
 *               description: Error type
 *       402:
 *         description: Project does not exist
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 *             type:
 *               type: string
 *               description: Error type
 *       403:
 *         description: User is a manager of this project
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 *             type:
 *               type: string
 *               description: Error type
 *       405:
 *         description: Already following the project
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 *             type:
 *               type: string
 *               description: Error type
 */
const express = require("express");
const User = require("../../models/users");
const Follower = require("../../models/follower");
const Project = require("../../models/projects");
const Manager = require("../../models/managers");
const Collaborator = require("../../models/collaborators");
const validateToken = require("../validate_token");
const router = express.Router();

// Middleware to handle JSON data in requests
router.use(express.json());

// logged = 0
// collaborator = 1
// manager = 2
router.post("/get_user_role", validateToken, async (req, res) => {
  try {
    // Extract data from the POST input
    const { user_id, project_id } = req.body;
    const u = await User.findById(user_id);
    const p = await Project.findById(project_id);
    const m = await Manager.findOne({ project_id, user_id });
    if (!!u && !!p) {
      if (!!m) {
        res.status(201).json({ role_id: 2 });
      } else {
        const c = await Collaborator.findOne({ project_id, user_id });
        if (!!c) {
          res.status(201).json({ role_id: 1 });
        } else {
          res.status(201).json({ role_id: 0 });
        }
      }
    } else {
      res.status(404).json({ message: "User/Project Not Found" });
    }
  } catch (error) {
    // Respond with an error message
    res.status(500).json({ message: error.message, type: "danger" });
  }
});

module.exports = router;
