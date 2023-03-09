import express, { Request, Response } from 'express';
import { MovieService } from '../service/MovieService';
import { Movie } from '../domain/model/Movie';

const router = express.Router();
const movieService = new MovieService();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints for managing movies
 *
 * definitions:
 *   Movie:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       genre:
 *         type: string
 *       year:
 *         type: number
 *       duration:
 *         type: number
 *
 * /movies:
 *   get:
 *     description: Returns all movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of movies
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Movie'
 *
 *   post:
 *     description: Adds a new movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: movie
 *         description: Movie object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie'
 *     responses:
 *       201:
 *         description: The newly created movie
 *         schema:
 *           $ref: '#/definitions/Movie'
 *       400:
 *         description: Invalid request payload
 */


router.get('/movies', (req: Request, res: Response) => {
    // retrieve movies from movie service
    const movies = movieService.getAllMovies();
    // return the movies as response
    res.status(200).json(movies);
});

router.post('/movies', (req: Request, res: Response) => {
    try {
        // retrieve movie data from request body
        const { name, genre, year, duration } = req.body;

        // add the movie using the movie service
        const movie = new Movie(name, genre, year, duration);
        const newMovie = movieService.addMovie(movie);
        // return the new movie as response
        res.status(201).json(newMovie);
    } catch (error) {
        // handle any errors that occur
        res.status(400).json({ message: error.message });
    }
});





