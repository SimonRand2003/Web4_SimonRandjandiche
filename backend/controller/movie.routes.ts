import express, { Request, Response } from 'express';
import { MovieService } from '../service/movie.service';
import { Movie } from '../domain/model/Movie';
import {MovieRepository} from "../domain/data-access/movie.db";

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the movie.
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: The year the movie was released.
 *         duration:
 *           type: number
 *           description: The runtime of the movie in minutes.
 *         genres:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genrewithid'
 *           description: The genres that the movie belongs to.
 *         ratings:
 *           type: array
 *           items:
 *           $ref: '#/components/schemas/Rating'
 *           description: The ratings that the movie has received.
 */






export class MovieController {
    private movieService: MovieService;

    constructor(movieService: MovieService) {
        this.movieService = movieService;
    }
    /**
     * @swagger
     * /movies:
     *   get:
     *     summary: Get all movies.
     *     tags:
     *       - Movies
     *     responses:
     *       200:
     *         description: A list of movies.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *       204:
     *         description: No movies found.
     *       500:
     *         description: Internal Server Error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */

    async getAll(req: Request, res: Response) {
        try {
            const movies = await this.movieService.getAllMovies();
            if (movies.length === 0) {
                res.sendStatus(204);
            } else {
                res.status(200).json(movies);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    /**
     * @swagger
     * /movies/{id}:
     *   get:
     *     summary: Get a movie by ID.
     *     tags:
     *     - Movies
     *     parameters:
     *       - name: id
     *         in: path
     *         description: The ID of the movie to retrieve.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       200:
     *         description: The requested movie.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       404:
     *         description: The requested movie was not found.
     */
    // Get a movie by id
    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const movie:Movie | null = await this.movieService.getMovieById(id);
            if (!movie) {
                res.status(404).json({ message: `Movie with id ${id} not found.` });
            }else {
                res.status(200).json(movie);

            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    /**
     * @swagger
     * /movies/add:
     *   post:
     *     summary: Add a new movie to the collection.
     *     tags:
     *       - Movies
     *     requestBody:
     *       description: The movie object to be added to the collection.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Movie'
     *     responses:
     *       201:
     *         description: The movie was successfully added to the collection.
     *       400:
     *         description: Invalid request body.
     *       500:
     *         description: Error while adding genre
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: An error occurred while adding the genre.
     */
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
    /**
     * @swagger
     * /movies/update/{id}:
     *   put:
     *     summary: Update a movie by ID
     *     tags:
     *     - Movies
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the movie to update
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       required: true
     *       description: New movie data
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Movie'
     *     responses:
     *       200:
     *         description: Movie updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Bad request. Invalid movie data provided
     */

    // Update a movie
    async updateById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const movieData: Movie = req.body;
            const movie = await this.movieService.updateMovie(id,movieData);
            res.status(200).json(movie);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    /**
     * @swagger
     * /movies/delete/{id}:
     *   delete:
     *     summary: Delete a movie by ID.
     *     tags:
     *     - Movies
     *     parameters:
     *       - name: id
     *         in: path
     *         description: The ID of the movie to delete.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       204:
     *         description: The movie was successfully deleted.
     *       404:
     *         description: The requested movie was not found.
     */

    // Delete a movie
    async deleteById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.movieService.getMovieById(id);
            await this.movieService.deleteMovie(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    /**
     * @swagger
     * /movies/addUser/{id}/{userId}:
     *   put:
     *     summary: Add a user to a movie.
     *     tags:
     *       - Movies
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the movie.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *       - name: userId
     *         in: path
     *         description: ID of the user.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       200:
     *         description: User added successfully to the movie.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Bad request. Invalid movie ID or user ID provided.
     */

// Add a user to a movie
    async addUserToMovie(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const userId = parseInt(req.params.userId);
            const movie = await this.movieService.addUserToMovie(id, userId);
            res.status(200).json(movie);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    /**
     * @swagger
     * /movies/removeUser/{id}/{userId}:
     *   put:
     *     summary: Remove a user from a movie.
     *     tags:
     *       - Movies
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the movie.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *       - name: userId
     *         in: path
     *         description: ID of the user.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       200:
     *         description: User removed successfully from the movie.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Bad request. Invalid movie ID or user ID provided.
     */

// Remove a user from a movie
    async removeUserFromMovie(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const userId = parseInt(req.params.userId);
            const movie = await this.movieService.removeUserFromMovie(id, userId);
            res.status(200).json(movie);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

}

// Example usage:
const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);
const movieRouter = express.Router();

movieRouter.get('/', movieController.getAll.bind(movieController));
movieRouter.get('/:id', movieController.getById.bind(movieController));
movieRouter.post('/add', movieController.create.bind(movieController));
movieRouter.put('/update/:id', movieController.updateById.bind(movieController));
movieRouter.put('/addUser/:id/:userId', movieController.addUserToMovie.bind(movieController));
movieRouter.put('/removeUser/:id/:userId', movieController.removeUserFromMovie.bind(movieController));
movieRouter.delete('/delete/:id', movieController.deleteById.bind(movieController));


export { movieRouter };
