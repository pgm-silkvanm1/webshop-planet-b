/*
Import packages
*/
import express from 'express';

/*
Import custom packages
*/
import * as categoryController from '../controllers/category.controller';
import * as productController from '../controllers/product.controller';
import * as orderController from '../controllers/order.controller';
import * as reviewController from '../controllers/review.controller';
import * as userController from '../controllers/user.controller';
import * as authController from '../controllers/auth.controller';
import * as promotionController from '../controllers/promotion.controller';
import * as profileController from '../controllers/profile.controller';
import { adminAuth, viewAuth } from '../../middleware/authenticate.middleware';

/*
Make a router
*/
const router = express.Router();

/*
Routes
*/

/**
 * @swagger
 * components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  - id
 *                  - name
 *                  - parentId
 *                  - createdAt
 *                  - updatedAt
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: An auto-incremented integer id
 *                  name:
 *                      type: string
 *                      description: The category name
 *                  parentId:
 *                      type: integer
 *                      description: The id of the parent category
 *                  createdAt:
 *                      type: string
 *                      description: A timestamp string of the date when the category was created
 *                  updatedAt:
 *                      type: string
 *                      description: A timestamp string of the date when the category was last updated
 *              example:
 *                  id: 6
 *                  name: kitchen
 *                  parentId: 1
 *                  createdAt: 2021-06-15T22:34:35.882Z
 *                  updatedAt: 2021-06-15T22:34:35.882Z
 *          SortedCategory:
 *              type: object
 *              required:
 *                  - id
 *                  - name
 *                  - parentId
 *                  - createdAt
 *                  - updatedAt
 *                  - children
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: An auto-incremented integer id
 *                  name:
 *                      type: string
 *                      description: The category name
 *                  parentId:
 *                      type: integer
 *                      description: The id of the parent category
 *                  createdAt:
 *                      type: string
 *                      description: A timestamp string of the date when the category was created
 *                  updatedAt:
 *                      type: string
 *                      description: A timestamp string of the date when the category was last updated
 *                  children:
 *                      type: array
 *                      items:
 *                          type: object
 *                          required:
 *                              - id
 *                              - name
 *                              - parentId
 *                              - createdAt
 *                              - updatedAt
 *                          properties:
 *                          id:
 *                              type: integer
 *                              description: An auto-incremented integer id
 *                          name:
 *                              type: string
 *                              description: The category name
 *                          parentId:
 *                              type: integer
 *                              description: The id of the parent category
 *                          createdAt:
 *                              type: string
 *                              description: A timestamp string of the date when the category was created
 *                          updatedAt:
 *                              type: string
 *                              description: A timestamp string of the date when the category was last updated
 *                          example:
 *                              id: 6
 *                              name: kitchen
 *                              parentId: 1
 *                              createdAt: 2021-06-15T22:34:35.882Z
 *                              updatedAt: 2021-06-15T22:34:35.882Z
 *              example:
 *                  id: 2
 *                  name: cleaning
 *                  parentId: null
 *                  createdAt: 2021-06-15T22:34:35.882Z
 *                  updatedAt: 2021-06-15T22:34:35.882Z
 *                  children:
 *                      id: 9
 *                      name: all-purpose
 *                      parentId: 2
 *                      createdAt: 2021-07-15T22:34:35.882Z
 *                      updatedAt: 2021-07-15T22:34:35.882Z
 */

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: The category managing API
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *      summary: Retrieve a list of categories
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: The list of all categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Category'
 */
router.get('/categories', categoryController.getCategories);
/**
 * @swagger
 * /api/categories/sorted:
 *  get:
 *      summary: Retrieve a list of categories sorted by parentId
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: The list of all sorted categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/SortedCategory'
 */
router.get('/categories/sorted', categoryController.getSortedCategories);
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *      summary: Get a specific category by Id
 *      tags: [Categories]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The category id
 *      responses:
 *          200:
 *              description: The specific category by Id
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          404:
 *              description: Could not find category with id
 */

router.get('/categories/:categoryId', categoryController.getCategoryById);
/**
 * @swagger
 * /api/categories:
 *   post:
 *      summary: Create a new category
 *      tags: [Categories]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          200:
 *              description: The category was succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          500:
 *              description: Server Error
 */
router.post('/categories', adminAuth, categoryController.createCategory);
/**
 * @swagger
 * /api/categories{id}:
 *   put:
 *      summary: Update the category by id
 *      tags: [Categories]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The category id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          200:
 *              description: The category was succesfully updated
 *          404:
 *              description: The category was not found
 *          500:
 *              description: Server Error
 */
router.put('/categories/:categoryId', adminAuth, categoryController.updateCategory);
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *      summary: Delete an existing category
 *      tags: [Categories]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The category id
 *      responses:
 *          200:
 *              description: The category was succesfully deleted
 *          404:
 *              description: The category was not found
 */
router.delete('/categories/:categoryId', adminAuth, categoryController.deleteCategory);

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/category/:categoryId', productController.getProductsByCategory);
router.get('/products/:id/reviews', productController.getProductReviews);
router.get('/products/:id/promotions', productController.getProductPromotions);
router.post('/products', adminAuth, productController.createProduct);
router.put('/products/:id', adminAuth, productController.updateProduct);
router.delete('/products/:id', adminAuth, productController.deleteProduct);

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', adminAuth, userController.createUser);
router.put('/users/:id', viewAuth, userController.updateUser);
router.delete('/users/:id', viewAuth, userController.deleteUser);

router.get('/orders', adminAuth, orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders/create/:userId', viewAuth, orderController.createOrder);
router.post('/orders/add/:id', orderController.addProductToOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

router.get('/reviews', reviewController.getReviews);
router.get('/reviews/:productId', reviewController.getReviewsByProductId);
router.post('/reviews/:userId/:productId', viewAuth, reviewController.createReview);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

router.get('/promotions', promotionController.getPromotions);
router.get('/promotions/:id', promotionController.getPromotionById);
router.get('/promotions/product/:productId', promotionController.getPromotionsByProductId);
router.post('/promotions/:productId', adminAuth, promotionController.createPromotion);
router.put('/promotions/:id', adminAuth, promotionController.updatePromotion);
router.delete('/promotions/:id', adminAuth, promotionController.deletePromotion);

router.get('/profiles', adminAuth, profileController.getProfiles);
router.get('/profiles/:id', adminAuth, profileController.getProfileById);
router.get('/profiles/users/:userId', viewAuth, profileController.getProfileByUserId);
router.post('/profiles/:userId', viewAuth, profileController.createProfile);
router.put('/profiles/:id', profileController.updateProfile);
router.delete('/profiles/:id', adminAuth, profileController.deleteprofile);

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

export default router;
