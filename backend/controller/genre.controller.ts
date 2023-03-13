import express, { Request, Response } from 'express';
import { GenreService } from '../service/genre.service';
import { Genre } from '../domain/model/genre';
import {GenreRepository} from "../domain/data-access/genre.db";



/**
 * swagger: "2.0"
 * info:
 *   version: "1.0.0"
 *   title: "GenreController API"
 *   description: "RESTful API for managing genres"
 *   host: "localhost:3000"
 *   basePath: "/api"
 *   schemes:
 *     - "http"
 *   consumes:
 *     - "application/json"
 *   produces:
 *     - "application/json"
 * paths:
 *   /genres:
 *     get:
 *       summary: "Get all genres"
 *       responses:
 *         "200":
 *           description: "Success"
 *           schema:
 *             type: "array"
 *             items:
 *               $ref: "#/definitions/Genre"
 *         "500":
 *           description: "Server Error"
 *     post:
 *       summary: "Create a new genre"
 *       parameters:
 *         - name: "genre"
 *           in: "body"
 *           description: "Genre object"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Genre"
 *       responses:
 *         "201":
 *           description: "Genre created successfully"
 *         "400":
 *           description: "Bad request"
 *   /genres/{id}:
 *     get:
 *       summary: "Get a genre by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of genre"
 *           required: true
 *           type: "integer"
 *       responses:
 *         "200":
 *           description: "Success"
 *           schema:
 *             $ref: "#/definitions/Genre"
 *         "404":
 *           description: "Genre not found"
 *     put:
 *       summary: "Update a genre by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of genre"
 *           required: true
 *           type: "integer"
 *         - name: "genre"
 *           in: "body"
 *           description: "Genre object"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Genre"
 *       responses:
 *         "200":
 *           description: "Genre updated successfully"
 *           schema:
 *             $ref: "#/definitions/Genre"
 *         "400":
 *           description: "Bad request"
 *     delete:
 *       summary: "Delete a genre by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of genre"
 *           required: true
 *           type: "integer"
 *       responses:
 *         "204":
 *           description: "Genre deleted successfully"
 *         "404":
 *           description: "Genre not found"
 * definitions:
 *   Genre:
 *     type: "object"
 *     required:
 *       - "name"
 *     properties:
 *       id:
 *         type: "integer"
 *       name:
 *         type: "string"
 */


export class GenreController {
    private genreService: GenreService;

    constructor(genreService: GenreService) {
        this.genreService = genreService;
    }

    public async getAllGenres(req: Request, res: Response): Promise<void> {
        try {
            const genres: Genre[] = await this.genreService.getAllGenres();
            res.status(200).json(genres);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getGenreById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const genre: Genre | null = await this.genreService.getGenreById(id);
            if (genre) {
                res.status(200).json(genre);
            } else {
                res.status(404).json({ message: `Genre with id ${id} not found.` });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async addGenre(req: Request, res: Response): Promise<void> {
        try {
            const genre: Genre = req.body;
            await this.genreService.addGenre(genre);
            res.status(201).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateGenre(req: Request, res: Response): Promise<void> {
        try {
            const genre: Genre = req.body;
            await this.genreService.updateGenre(genre);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteGenre(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            await this.genreService.deleteGenre(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

// Example usage:
const genreRepository = new GenreRepository();
const genreService = new GenreService(genreRepository);
const genreController = new GenreController(genreService);
const router = express.Router();

router.get('/genres', genreController.getAllGenres.bind(genreController));
router.get('/genres/:id', genreController.getGenreById.bind(genreController));
router.post('/genres', genreController.addGenre.bind(genreController));
router.put('/genres/:id', genreController.updateGenre.bind(genreController));
router.delete('/genres/:id', genreController.deleteGenre.bind(genreController));

export { router };