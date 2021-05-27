/*
Import packages
*/
import express from 'express';

/*
Import custom packages
*/
import * as categoryController from '../controllers/category.controller';
import * as productController from '../controllers/product.controller';
import * as userController from '../controllers/user.controller';

/*
Make a router
*/
const router = express.Router();

/*
Routes
*/

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of categories. Can be used to populate a list of categories when prototyping or testing an API.*
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The category ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The categories name.
 *                         example: Computers
 *                      createdAt:
 *                          type: date
 *                          description: The date at wich the category was created
 *                          example: 2021-05-24T20:18:50.847Z
 *                      updatedAt:
 *                          type: date
 *                          description: The date at wich the category was created
 *                          example: 2021-05-24T20:18:50.847Z        
 *                      children:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: The category ID.
 *                                      example: 1
 *                                  name:
 *                                  type: string
 *                                  description: The categories name.
 *                                  example: Computers
 *                                  createdAt:
 *                                      type: date
 *                                      description: The date at wich the category was created
 *                                      example: 2021-05-24T20:18:50.847Z
 *                                  updatedAt:
 *                                      type: date
 *                                      description: The date at wich the category was created
 *                                      example: 2021-05-24T20:18:50.847Z
 *                                  
 */
router.get('/categories', categoryController.getSortedCategories);
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get a specific category by Id
 *     description: Get a specific category by Id
 */

router.get('/categories/:categoryId', categoryController.getCategoryById);
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get a specific existing category
 *     description: Get a specific existing category
 */
router.post('/categories', categoryController.createCategory);
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category
 */
router.put('/categories/:categoryId', categoryController.updateCategory);
/**
 * @swagger
 * /api/categories:
 *   delete:
 *     summary: Delete an existing category
 *     description: Delete an existing category
 */
router.delete('/categories/:categoryId', categoryController.deleteCategory);

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products/', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users. Can be used to populate a list of userss when prototyping or testing an API.*
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  data:
 *                       type: object
 *                       properties:
 *                           id:
 *                           type: integer
 *                           description: The user ID.
 *                           example: 1
 *                       uuid:
 *                           type: uuid
 *                           description: The user ID.
 *                           example: de0bd885-6c95-4828-927e-d205cbf843ad
 *                        email:
 *                           type: string
 *                           description: The user email address.
 *                           example: johndoe @ someone.com
 *                       password:
 *                           type: string
 *                           description: The user password.
 *                           example: mypassword
 *                       admin:
 *                          type: boolean
 *                          description: The user role.
 *                          example: false
 */
router.get('/users', userController.getUsers);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a specific user by user uuid
 *     description: Get a specific user by user uuid
 */
router.get('/users/:uuid', userController.getUserByUuid);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /api/users/{uuid}:
 *   put:
 *     summary: Update an existing user
 *     description: Update an existing user
 */
router.put('/users/:uuid', userController.updateUser);

/**
 * @swagger
 * /api/users/{uuid}:
 *   delete:
 *     summary: Delete an existing user
 *     description: Delete an existing user
 */
router.delete('/users/:uuid', userController.deleteUser);

export default router;
