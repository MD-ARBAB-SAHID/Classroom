const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const studentController = require("../controllers/students");
const authMiddlerware  =require("../middlewares/auth");

const imageGetter = require("../middlewares/multer");
router.post(
  "/signup",
  imageGetter.single("image"),
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("confirmPassword").isLength({ min: 8 }),
   
  ],
  studentController.signup
);

router.post(
  "/login",
  [body("email").notEmpty(), body("password").isLength({ min: "6" })],
  studentController.login
);


router.use(authMiddlerware);
router.get("/profile/:studentId",studentController.profileData);

module.exports = router;
