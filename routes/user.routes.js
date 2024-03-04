const router = require("express").Router();
const userController =   require('../controllers/user.controller');
const awaitHandlerFactory = require("../middleware/awaitHandleFactory.middleware");
const {createUserSchema} = require('../middleware/validators/user');

/**
 * @swagger
 * /user:
 *  get:
 *    tags:
 *      - Users
 *    summary: To get all the users
 *    requestBody:
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: user created success
 *      500:
 *        description: failed to create
 * 
 */

router.get("/",userController.findAll);

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *    tags:
 *      - Users
 *    summary: To get user details by Id
 *    description: Send the User Id to fetch user
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: ID of pet to return
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: user created success
 *      500:
 *        description: failed to create
 * 
 */

router.get("/:id", userController.findById);

/**
 * @swagger
 * /user:
 *  post:
 *    tags:
 *      - Users
 *    summary: To create a user
 *    description: Send the User Details to create a user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: user created success
 *      500:
 *        description: failed to create
 * 
 */
router.post('/', createUserSchema, awaitHandlerFactory(userController.create));


/**
 * @swagger
 * /user/{userId}:
 *  put:
 *    tags:
 *      - Users
 *    summary: To update a user by Id
 *    description: Update the User Details by user id
 *    parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: user created success
 *      500:
 *        description: failed to create
 * 
 */
router.put('/:id', awaitHandlerFactory(userController.update));

/**
 * @swagger
 * /user/{userId}:
 *  delete:
 *    tags:
 *      - Users
 *    summary: To delete user by Id
 *    description: Send the User Id to fetch user
 *    parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: user created success
 *      500:
 *        description: failed to create
 * 
 */
router.delete('/:id', userController.delete);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - created
 *       properties:
 *         id:
 *           type: string
 *         first_name:
 *           type: string
 *           required: true
 *         last_name:
 *           type: string
 *           required: true
 *         username:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         phone:
 *           type: integer
 *           required: true
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *       example:
 *         first_name: FName
 *         last_name: LName
 *         username: username
 *         email:  user@example.com
 */
