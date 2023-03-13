import express, { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { User } from '../domain/model/user';
import {UserRepository} from "../domain/data-access/user.db";


export class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    public async addUser(req: Request, res: Response): Promise<void> {
        const user = new User(
            req.body.id,
            req.body.username,
            req.body.email,
            new Date(req.body.birthdate),
            req.body.password
        );
        await this.userService.addUser(user);
        res.sendStatus(201);
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(userId);
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.birthdate = req.body.birthdate ? new Date(req.body.birthdate) : user.birthdate;
            user.password = req.body.password || user.password;
            await this.userService.updateUser(user);
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        await this.userService.deleteUser(userId);
        res.sendStatus(204);
    }
}

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const router = express.Router();

router.get('/users', userController.getAllUsers.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.post('/users', userController.addUser.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));

export { router };