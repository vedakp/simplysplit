const router = require("express").Router();
const splitController =   require('../controllers/split.controller');
const awaitHandlerFactory = require("../middleware/awaitHandleFactory.middleware");
//const {createUserSchema} = require('../middleware/validators/user');

/**
 * @swagger
 * /split:
 *  get:
 *    tags:
 *      - Splits
 *    summary: To get all the Splits
 *    requestBody:
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: Split created success
 *      500:
 *        description: failed to create
 * 
 */

router.get("/",splitController.findAll);

/**
 * @swagger
 * /split/{splitId}:
 *  get:
 *    tags:
 *      - Splits
 *    summary: To get split details by Id
 *    description: Send the split Id to fetch split
 *    parameters:
 *      - name: splitId
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
 *        description: Split created success
 *      500:
 *        description: failed to create
 * 
 */

router.get("/:id", splitController.findByTransactionId);

/**
 * @swagger
 * /split:
 *  post:
 *    tags:
 *      - Splits
 *    summary: To create a split
 *    description: Send the split Details to create a split
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Splits'
 *    responses:
 *      200:
 *        description: Splits created success
 *      500:
 *        description: failed to create
 * 
 */
router.post('/', awaitHandlerFactory(splitController.create));


/**
 * @swagger
 * /split/{splitId}:
 *  put:
 *    tags:
 *      - Splits
 *    summary: To update a split by Id
 *    description: Update the Split Details by Split id
 *    parameters:
 *      - name: splitId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Splits'
 *    responses:
 *      200:
 *        description: Split created success
 *      500:
 *        description: failed to create
 * 
 */
router.put('/:id', awaitHandlerFactory(splitController.update));

/**
 * @swagger
 * /split/{splitId}:
 *  delete:
 *    tags:
 *      - Splits
 *    summary: To delete Split by Id
 *    description: Send the Split Id to fetch Split
 *    parameters:
 *      - name: splitId
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
 *        description: Split created success
 *      500:
 *        description: failed to create
 * 
 */
router.delete('/:id', splitController.delete);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Splits:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         trx_id:
 *           type: integer
 *           required: true
 *         from_user_id:
 *           type: integer
 *           required: true
 *         to_user_id:
 *           type: integer
 *           required: true
 *         amount:
 *           type: string
 *           required: false
 *         share_percentage:
 *           type: string
 *           required: false
 *         share_qnt:
 *           type: string
 *           required: false
 *         created_at:
 *           type: string
 *           required: false
 *         updated_at:
 *           type: string
 *           required: false
 *       example:
 *         user_id: 1
 *         group_id: ''
 *         amount: 100.25
 *         currency:  INR
 */
