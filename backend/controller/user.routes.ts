import express, { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import {UserRepository} from "../domain/data-access/user.db";
import {User} from "../domain/model/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 *   components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              description: Unique identifier of the user.
 *            username:
 *              type: string
 *              description: The username of the user.
 *            email:
 *              type: string
 *              description: The email address of the user.
 *            birthdate:
 *              type: string
 *              format: date
 *              description: The birthdate of the user.
 *            password:
 *              type: string
 *              format: password
 *              description: The password of the user.
 */



export class UserRoutes {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     responses:
     *       200:
     *         description: Returns a list of all users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     *     tags:
     *     - Users
     */
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }


    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: Numeric ID of the user to retrieve
     *     tags:
     *     - Users
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       '404':
     *         description: User not found
     */



    public async getUserById(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.sendStatus(404);
        }
    }

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Login a user
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: Email or Password are incorrect
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Email or Password are incorrect
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: An error occurred while logging in.
     */


    public async login(req: Request, res: Response): Promise<void> {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const token = await this.userService.authenticate({email, password})
            const user = await this.userService.getUserByName(email);
            const userid = user.userid;
            const username = user.username;
            res.status(200).json({ userid,username, token });
            } catch (error) {
                res.status(401).send('Email or Password are incorrect');
            }
    }





    /**
     * @swagger
     * /users/add:
     *   post:
     *     summary: Add a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: User added successfully
     *       500:
     *         description: Internal server error
     *     tags:
     *       - Users
     */
    public async addUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, birthdate, password } = req.body;
            const userInput = { username, email, birthdate, password };
            const user = await this.userService.addUser(userInput);
            const user2 = await this.userService.getUserByName(email);
            const token = await this.userService.authenticate({email, password})
            const userid = user2.userid;
            res.status(201).json({ userid,username, token });
        } catch (error) {
            res.status(500).send(error.toString());
        }
    }


    /**
     * @swagger
     * /users/update/{id}:
     *   put:
     *     summary: Update een gebruiker
     *     description: Update de gegevens van de gebruiker met het opgegeven id.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Het id van de te updaten gebruiker.
     *         schema:
     *           type: integer
     *       - in: body
     *         name: body
     *         required: true
     *         description: Het object met de nieuwe gegevens van de gebruiker.
     *         schema:
     *           type: object
     *           properties:
     *             username:
     *               type: string
     *             email:
     *               type: string
     *             birthdate:
     *               type: string
     *               format: date
     *             password:
     *               type: string
     *     responses:
     *       204:
     *         description: Gebruiker succesvol geüpdatet.
     *       404:
     *         description: Gebruiker niet gevonden.
     *       500:
     *         description: Interne serverfout.
     *     tags:
     *     - Users
     */

    public async updateUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(userId);
        const id: number = parseInt(req.params.id);
        if (user) {
            await this.userService.updateUser(id,user);
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
    /**
     * @swagger
     * /users/delete/{id}:
     *   delete:
     *     summary: Delete a user
     *     description: Deletes the user with the specified id from the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The id of the user to delete.
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: User successfully deleted.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal server error.
     *     tags:
     *       - Users
     */


    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        await this.userService.deleteUser(userId);
        res.sendStatus(204);
    }

    /**
     * @swagger
     * /users/getUserMoviesById/{id}:
     *   get:
     *     summary: Get user movies by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: Numeric ID of the user to retrieve movies for
     *     tags:
     *     - Users
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       '404':
     *         description: User not found
     */

    public async getUserMoviesById(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserMoviesById(userId);
        res.status(200).json(user);
    }

    /**
     * @swagger
     * /users/getUserName/{id}:
     *   get:
     *     summary: Get username by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: Numeric ID of the user to retrieve username for
     *     tags:
     *     - Users
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 username:
     *                   type: string
     *       '404':
     *         description: User not found
     */

    public async getUserName(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserName(userId);
        res.status(200).json(user);
    }

}

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserRoutes(userService);
const userRouter = express.Router();




userRouter.get('/users', userController.getAllUsers.bind(userController));
userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.get('/getUserMoviesById/:id', userController.getUserMoviesById.bind(userController));
userRouter.post('/login', userController.login.bind(userController))
userRouter.post('/add', userController.addUser.bind(userController));
userRouter.put('/update/:id', userController.updateUser.bind(userController));
userRouter.delete('/delete/:id', userController.deleteUser.bind(userController));
userRouter.get('/getusername/:id', userController.getUserName.bind(userController));

export { userRouter };