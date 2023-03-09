import express, { Request, Response } from 'express';
import { MovieService } from '../service/movie.service';
import { Movie } from '../domain/model/Movie';
import {MovieRepository} from "../domain/data-access/movie.db";
/**
 * swagger: "2.0"
 * info:
 *   version: "1.0.0"
 *   title: "MovieController API"
 *   description: "RESTful API for managing movies"
 *   host: "localhost:3000"
 *   basePath: "/api"
 *   schemes:
 *     - "http"
 *   consumes:
 *     - "application/json"
 *   produces:
 *     - "application/json"
 * paths:
 *   /movies:
 *     get:
 *       summary: "Get all movies"
 *       responses:
 *         "200":
 *           description: "Success"
 *           schema:
 *             type: "array"
 *             items:
 *               $ref: "#/definitions/Movie"
 *         "500":
 *           description: "Server Error"
 *     post:
 *       summary: "Create a new movie"
 *       parameters:
 *         - name: "movie"
 *           in: "body"
 *           description: "Movie object"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Movie"
 *       responses:
 *         "201":
 *           description: "Movie created successfully"
 *         "400":
 *           description: "Bad request"
 *   /movies/{id}:
 *     get:
 *       summary: "Get a movie by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of movie"
 *           required: true
 *           type: "integer"
 *       responses:
 *         "200":
 *           description: "Success"
 *           schema:
 *             $ref: "#/definitions/Movie"
 *         "404":
 *           description: "Movie not found"
 *     put:
 *       summary: "Update a movie by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of movie"
 *           required: true
 *           type: "integer"
 *         - name: "movie"
 *           in: "body"
 *           description: "Movie object"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Movie"
 *       responses:
 *         "200":
 *           description: "Movie updated successfully"
 *           schema:
 *             $ref: "#/definitions/Movie"
 *         "400":
 *           description: "Bad request"
 *     delete:
 *       summary: "Delete a movie by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of movie"
 *           required: true
 *           type: "integer"
 *       responses:
 *         "204":
 *           description: "Movie deleted successfully"
 *         "404":
 *           description: "Movie not found"
 * definitions:
 *   Movie:
 *     type: "object"
 *     required:
 *       - "title"
 *       - "year"
 *     properties:
 *       id:
 *         type: "integer"
 *       title:
 *         type: "string"
 *       year:
 *         type: "integer"
 *       director:
 *         type: "string"
 */



 export class MovieController {
    private movieService: MovieService;

    constructor(movieService: MovieService) {
        this.movieService = movieService;
    }

    // Get all movies
    async getAll(req: Request, res: Response) {
        try {
            const movies = await this.movieService.getAllMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Get a movie by id
    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const movie = await this.movieService.getMovieById(id);
            res.json(movie);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    // Add a movie

    async create(req: Request, res: Response) {
        try {
            const movieData: Movie = req.body;
            await this.movieService.addMovie(movieData);
            res.status(201).send("Movie created successfully");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // Update a movie
    async updateById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const movieData: Movie = req.body;
            const movie = await this.movieService.updateMovie(movieData);
            res.json(movie);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    // Delete a movie
    async deleteById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const movieData: Movie = req.body;
            await this.movieService.deleteMovie(movieData);
            res.status(204).send();
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
}

// Example usage:
const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);
const router = express.Router();

router.get('/movies', movieController.getAll.bind(movieController));
router.get('/movies/:id', movieController.getById.bind(movieController));
router.post('/movies', movieController.create.bind(movieController));
router.put('/movies/:id', movieController.updateById.bind(movieController));
router.delete('/movies/:id', movieController.deleteById.bind(movieController));

export { router };
