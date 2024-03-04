const router = require("express").Router();
const transactionController =   require('../controllers/transaction.controller');
const awaitHandlerFactory = require("../middleware/awaitHandleFactory.middleware");
//const {createUserSchema} = require('../middleware/validators/user');

/**
 * @swagger
 * /transaction:
 *  get:
 *    tags:
 *      - Transactions
 *    summary: To get all the Transactions
 *    requestBody:
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: Transaction created success
 *      500:
 *        description: failed to create
 * 
 */

router.get("/",transactionController.findAll);

/**
 * @swagger
 * /transaction/{transactionId}:
 *  get:
 *    tags:
 *      - Transactions
 *    summary: To get transaction details by Id
 *    description: Send the transaction Id to fetch transaction
 *    parameters:
 *      - name: transactionId
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
 *        description: Transaction created success
 *      500:
 *        description: failed to create
 * 
 */

router.get("/:id", transactionController.findById);

/**
 * @swagger
 * /transaction:
 *  post:
 *    tags:
 *      - Transactions
 *    summary: To create a transaction
 *    description: Send the transaction Details to create a transaction
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Transactions'
 *    responses:
 *      200:
 *        description: Transactions created success
 *      500:
 *        description: failed to create
 * 
 */
router.post('/', awaitHandlerFactory(transactionController.create));


/**
 * @swagger
 * /transaction/{transactionId}:
 *  put:
 *    tags:
 *      - Transactions
 *    summary: To update a transaction by Id
 *    description: Update the Transaction Details by Transaction id
 *    parameters:
 *      - name: transactionId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Transactions'
 *    responses:
 *      200:
 *        description: Transaction created success
 *      500:
 *        description: failed to create
 * 
 */
router.put('/:id', awaitHandlerFactory(transactionController.update));

/**
 * @swagger
 * /transaction/{transactionId}:
 *  delete:
 *    tags:
 *      - Transactions
 *    summary: To delete Transaction by Id
 *    description: Send the Transaction Id to fetch Transaction
 *    parameters:
 *      - name: transactionId
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
 *        description: Transaction created success
 *      500:
 *        description: failed to create
 * 
 */
router.delete('/:id', transactionController.delete);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Transactions:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: integer
 *           required: false
 *         group_id:
 *           type: integer
 *           required: false
 *         amount:
 *           type: integer
 *           required: true
 *         currency:
 *           type: string
 *           required: false
 *         currency_symbol:
 *           type: string
 *           required: false
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *       example:
 *         user_id: 1
 *         group_id: ''
 *         amount: 100.25
 *         currency:  INR
 */
