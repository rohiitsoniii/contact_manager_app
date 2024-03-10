const express = require("express");
const router = express.Router();
const {getContact,createContact,updateContact,getContacts,deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenhandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
// router.route("/").post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);
module.exports = router;