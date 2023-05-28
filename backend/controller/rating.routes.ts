import express, { Request, Response } from 'express';
import { Rating } from '../domain/model/Rating';
import { RatingService } from '../service/rating.service';
import { RatingRepository } from '../domain/data-access/rating.db';


/**
 * @swagger
 *   components:
 *    schemas:
 *      Rating:
 *          type: object
 *          properties:
 *            ratingid:
 *              type: number
 *              description: The unique identifier for the rating.
 *            movieid:
 *              type: number
 *              description: The ID of the movie that this rating is for.
 *            userid:
 *              type: number
 *              description: The ID of the user who made the rating.
 *            rating:
 *              type: number
 *              description: The numerical rating given by the user (between 0 and 10).
 *            comment:
 *              type: string
 *              description: An optional comment left by the user when making the rating.
 */


export class RatingRoutes {
    private ratingService: RatingService;
    constructor(ratingService: RatingService) {
        this.ratingService = ratingService;
    }
    /**
     * @swagger
     * /ratings:
     *   get:
     *     summary: Get all ratings
     *     tags:
     *     - Ratings
     *     description: Retrieve a list of all ratings from the database
     *     responses:
     *       200:
     *         description: A list of ratings retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Rating'
     *       500:
     *         description: An error occurred while retrieving the ratings
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Description of the error that occurred
     */
    public async getAllRatings(req: Request, res: Response): Promise<void> {
        try {
            const ratings: Rating[] = await this.ratingService.getAllRatings();
            res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    /**
     * @swagger
     * /ratings/{id}:
     *   get:
     *     summary: Get a rating by ID
     *     tags:
     *     - Ratings
     *     description: Get a rating from the database by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the rating to retrieve.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Rating found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Rating'
     *       404:
     *         description: Rating not found
     *         content:
     *           application/json:
     *             example:
     *               { "error": "Rating with id {id} not found" }
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             example:
     *               { "error": "Internal server error" }
     */
    public async getRatingById(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        try {
            const rating: Rating | null = await this.ratingService.getRatingById(id);
            if (rating) {
                res.status(200).json(rating);
            } else {
                res.status(404).json({ error: `Rating with id ${id} not found` });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    /**
     * @swagger
     * /ratings/add:
     *   post:
     *     summary: Add a new rating
     *     description: Add a new rating to the database.
     *     tags:
     *       - Ratings
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Rating'
     *     responses:
     *       '201':
     *         description: Successfully added the rating
     *       '500':
     *         description: Internal server error
     */

    public async addRating(req: Request, res: Response): Promise<void> {
        const rating: Rating = req.body;
        try {
            await this.ratingService.addRating(rating);
            res.sendStatus(201);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    /**
     * @swagger
     * /ratings/update/{id}:
     *   put:
     *     summary: Update a rating by id
     *     description: Update a rating with the specified id with the new values provided in the request body
     *     tags:
     *       - Ratings
     *     parameters:
     *       - in: path
     *         name: id
     *         description: ID of the rating to update
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       description: New rating object to replace the old rating
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Rating'
     *     responses:
     *       204:
     *         description: Rating updated successfully
     *       404:
     *         description: Rating with specified id not found
     *       500:
     *         description: Internal server error
     */

    public async updateRating(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        const rating: Rating = req.body;

        try {
            await this.ratingService.updateRating(id, rating);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    /**
     * @swagger
     * /ratings/delete/{id}:
     *   delete:
     *     tags:
     *     - Ratings
     *     summary: Delete a rating by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Numeric ID of the rating to delete
     *     responses:
     *       204:
     *         description: Rating successfully deleted
     *       404:
     *         description: Rating with the given ID not found
     *       500:
     *         description: Server error
     */
    public async deleteRating(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        try {
            const rating: Rating | null = await this.ratingService.getRatingById(id);
            if (rating) {
                await this.ratingService.deleteRating(rating);
                res.sendStatus(204);
            } else {
                res.status(404).json({ error: `Rating with id ${id} not found` });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /ratings/{userid}/{movieid}:
     *   get:
     *     summary: Get a rating by user ID and movie ID.
     *     tags:
     *       - Ratings
     *     parameters:
     *       - name: userid
     *         in: path
     *         description: ID of the user.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *       - name: movieid
     *         in: path
     *         description: ID of the movie.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       200:
     *         description: The requested rating.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Rating'
     *       404:
     *         description: The requested rating was not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
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

    public async getRatingByUserAndMovieId(req: Request, res: Response): Promise<void> {
        const userId: number = parseInt(req.params.userid, 10);
        const movieId: number = parseInt(req.params.movieid, 10);
        try {
            const rating: Rating | null = await this.ratingService.getRatingByUserAndMovieId(userId, movieId);
            if (rating) {
                res.status(200).json(rating);
            } else {
                res.status(404).json({ error: `Rating with user id ${userId} and ${movieId} movieId not found` });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

const ratingRepository = new RatingRepository();
const ratingService = new RatingService(ratingRepository);
const ratingController = new RatingRoutes(ratingService);
const ratingRouter = express.Router();

ratingRouter.get('/', ratingController.getAllRatings.bind(ratingController));
ratingRouter.get('/:id', ratingController.getRatingById.bind(ratingController));
ratingRouter.get('/:userid/:movieid', ratingController.getRatingByUserAndMovieId.bind(ratingController));
ratingRouter.post('/add', ratingController.addRating.bind(ratingController));
ratingRouter.put('/update/:id', ratingController.updateRating.bind(ratingController));
ratingRouter.delete('/delete/:id', ratingController.deleteRating.bind(ratingController));

export { ratingRouter };

