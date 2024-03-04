const { body, oneOf, check } = require("express-validator");

exports.validateCreateAlbum = [
    body("name")
      .exists()
      .withMessage("Album name is required")
      .isLength({max: 20})
      .matches(/^[a-z0-9 ']+$/)
      .withMessage("Only characters and inverted commas are allowed")
      .trim(),
    body("business_id")
      .exists()
      .withMessage("Business Id is required")
      .notEmpty()
      .withMessage("Business Id cannot be empty")
      .isNumeric()
      .withMessage("Business Id must be a number")
  ];


  exports.validateUpdateAlbum = [
      oneOf([
        body("name")
        .exists()
        .withMessage("Album name is required")
        .isLength({max: 20})
        .matches(/^[a-z0-9 ']+$/)
        .withMessage("Only characters and inverted commas are allowed")
        .trim(),
        check('image').exists().withMessage('Please select a image')
      ])
  ]