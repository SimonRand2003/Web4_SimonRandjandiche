import express, { Request, Response } from 'express';
import { GenreService } from '../service/genre.service';
import { Genre } from '../domain/model/genre';
import {GenreRepository} from "../domain/data-access/genre.db";


/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the genre
 *         description:
 *           type: string
 *           description: A description of the genre
 *     Genrewithid:
 *       type: object
 *       properties:
 *         genreid:
 *           type: number
 *         name:
 *           type: string
 *           description: The name of the genre
 *         description:
 *           type: string
 *           description: A description of the genre
 */


export class GenreRoutes {
    private genreService: GenreService;

    constructor(genreService: GenreService) {
        this.genreService = genreService;
    }
    /**
     * @swagger
     * /genres:
     *   get:
     *     summary: Get a list of all genres
     *     tags:
     *     - Genres
     *     responses:
     *       200:
     *         description: A list of genres
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Genrewithid'
     */

    public async getAllGenres(req: Request, res: Response): Promise<void> {
        try {
            const genres: Genre[] = await this.genreService.getAllGenres();
            res.status(200).json(genres);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    /**
     * @swagger
     * /genres/{id}:
     *   get:
     *      summary: Get a genre by ID
     *      tags:
     *      - Genres
     *      responses:
     *         200:
     *           description: A genre
     *           content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/Genrewithid'
     *         404:
     *           description: Genre not found
     *           content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          message:
     *                              type: string
     *                              example: Genre with id 123 not found.
     *      parameters:
     *        - name: id
     *          in: path
     *          description: Genre ID
     *          required: true
     *          schema:
     *            type: integer
     *            format: int64
     */
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



    /**
     * @swagger
     * /genres/add:
     *   post:
     *      summary: Add a new genre
     *      tags:
     *      - Genres
     *      requestBody:
     *         required: true
     *         description: Genre object to be added
     *         content:
     *             application/json:
     *                 schema:
     *                     $ref: '#/components/schemas/Genre'
     *      responses:
     *         201:
     *           description: Genre added successfully
     *         400:
     *           description: Error while adding genre
     *           content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          error:
     *                              type: string
     *                              example: An error occurred while adding the genre.
     */

    public async addGenre(req: Request, res: Response): Promise<void> {
        try {
            const genre: Genre = req.body;
            await this.genreService.addGenre(genre);
            res.status(201).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /genres/update/{id}:
     *   put:
     *      summary: Update an existing genre by ID
     *      tags:
     *      - Genres
     *      parameters:
     *         - name: id
     *           in: path
     *           description: Genre ID
     *           required: true
     *           schema:
     *              type: integer
     *              format: int64
     *      requestBody:
     *         required: true
     *         description: Updated genre object
     *         content:
     *            application/json:
     *               schema:
     *                  $ref: '#/components/schemas/Genre'
     *      responses:
     *         204:
     *           description: Genre updated successfully
     *         400:
     *           description: Error while updating genre
     *           content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          error:
     *                              type: string
     *                              example: An error occurred while updating the genre.
     */

    public async updateGenre(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const genre: Genre = req.body;
            await this.genreService.updateGenre(id,genre);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /genres/delete/{id}:
     *   delete:
     *      summary: Delete an existing genre based on ID
     *      tags:
     *      - Genres
     *      parameters:
     *         - name: id
     *           in: path
     *           description: ID of the genre to be deleted
     *           required: true
     *           schema:
     *              type: integer
     *              format: int64
     *      responses:
     *         204:
     *           description: Genre successfully deleted
     *         404:
     *           description: Error deleting genre
     *           content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          error:
     *                              type: string
     *                              example: An error occurred while deleting the genre.
     */

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
const genreController = new GenreRoutes(genreService);
const genreRouter = express.Router();

genreRouter.get('/genres', genreController.getAllGenres.bind(genreController));
genreRouter.get('/genres/:id', genreController.getGenreById.bind(genreController));
genreRouter.post('/genres/add', genreController.addGenre.bind(genreController));
genreRouter.put('/genres/update/:id', genreController.updateGenre.bind(genreController));
genreRouter.delete('/genres/delete/:id', genreController.deleteGenre.bind(genreController));

export { genreRouter };