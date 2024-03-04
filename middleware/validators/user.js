const { body } = require("express-validator");
//const ROLES = require("../../utils/userRoles.utils");

exports.createUserSchema = [
  body("first_name")
    .exists()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 2 })
    .withMessage("Must be at least 2 chars long"),
  body("last_name")
    .exists()
    .withMessage("Your first name is required")
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("username")
    .exists()
    .withMessage("username is required")
    .notEmpty(),
  body("phone")
    .exists()
    .withMessage("Mobile number is required")
    .isLength({ min: 10 })
    .withMessage("Mobile number must contain at least 10 characters")
    .isLength({ max: 10 })
];

