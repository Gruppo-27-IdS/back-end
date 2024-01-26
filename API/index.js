const express = require("express");
const router = express.Router();
//file d'appoggio per collegare le API

//USERS API
router.use("/", require("./users/add_user"));
router.use("/", require("./users/remove_user"));
router.use("/", require("./users/update_user"));
router.use("/", require("./users/get_all_users"));
router.use("/", require("./users/user_login"));
router.use("/", require("./users/follow_project"));
router.use("/", require("./users/get_user_by_id"));

//PROJECTS API
router.use("/", require("./projects/add_project"));
router.use("/", require("./projects/add_proj_to_manager"));
router.use("/", require("./projects/get_proj_list"));
router.use("/", require("./projects/get_proj_by_name"));
router.use("/", require("./projects/delete_project"));
router.use("/", require("./projects/upload_images"));
router.use("/", require("./projects/get_proj_by_id"));

//NEWS API
router.use("/", require("./news/add_news"));
router.use("/", require("./news/add_like"));
router.use("/", require("./news/add_comment"));
router.use("/", require("./news/add_file_news"));

module.exports = router;
