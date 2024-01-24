const express = require("express");
const router = express.Router();
//file d'appoggio per collegare le API

//USERS API
router.use("/", require("./users/add_user"));
router.use("/", require("./users/remove_user"));
router.use("/", require("./users/update_user"));
router.use("/", require("./users/get_all_users"));
router.use("/", require("./users/user_login"));

//PROJECTS API
router.use("/", require("./projects/add_project"));
router.use("/", require("./projects/add_proj_to_manager"));
router.use("/", require("./projects/get_proj_list"));
router.use("/", require("./projects/get_proj_by_name"));
router.use("/", require("./projects/delete_project"));
router.use(cors({ origin: 'http://localhost:5173' }));
module.exports = router;
