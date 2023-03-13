import express, { Request, Response } from 'express';
import { Rating } from '../domain/model/Rating';
import { RatingService } from '../service/rating.service';
import { RatingRepository } from '../domain/data-access/rating.db';


/**
 * swagger: "2.0"
 * info:
 *   version: "1.0.0"
 *   title: "RatingController API"
 *   description: "RESTful API for managing ratings"
 *   host: "localhost:3000"
 *   basePath: "/api"
 *   schemes:
 *     - "http"
 *   consumes:
 *     - "application/json"
 *   produces:
 *     - "application/json"
 * paths:
 *   /ratings:
 *     get:
 *       summary: "Get all ratings"
 *       responses:
 *         "200":
 *           description: "Success"
 *           schema:
 *             type: "array"
 *             items:
 *               $ref: "#/definitions/Rating"
 *         "500":
 *           description: "Server Error"
 *     post:
 *       summary: "Create a new rating"
 *       parameters:
 *         - name: "rating"
 *           in: "body"
 *           description: "Rating object"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Rating"
 *       responses:
 *         "201":
 *           description: "Rating created successfully"
 *         "400":
 *           description: "Bad request"
 *   /ratings/{id}:
 *     get:
 *       summary: "Get a rating by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of rating"
 *           required: true
 *           type: "integer"
 *       responses:
 *         "200":
 *           description: "Success"
 *           schema:
 *             $ref: "#/definitions/Rating"
 *         "404":
 *           description: "Rating not found"
 *     put:
 *       summary: "Update a rating by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of rating"
 *           required: true
 *           type: "integer"
 *         - name: "rating"
 *           in: "body"
 *           description: "Rating object"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Rating"
 *       responses:
 *         "204":
 *           description: "Rating updated successfully"
 *         "400":
 *           description: "Bad request"
 *     delete:
 *       summary: "Delete a rating by id"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of rating"
 *           required: true
 *           type: "integer"
 *       responses:
 *         "204":
 *           description: "Rating deleted successfully"
 *         "404":
 *           description: "Rating not found"
 * definitions:
 *   Rating:
 *     type: "object"
 *     required:
 *       - "value"
 *     properties:
 *       id:
 *         type: "integer"
 *       value:
 *         type: "integer"
 *       comment:
 *         type: "string"
 */


export class RatingController {
    private ratingService: RatingService;
    constructor(ratingService: RatingService) {
        this.ratingService = ratingService;
    }

    public async getAllRatings(req: Request, res: Response): Promise<void> {
        try {
            const ratings: Rating[] = await this.ratingService.getAllRatings();
            res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

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

    public async addRating(req: Request, res: Response): Promise<void> {
        const rating: Rating = req.body;
        try {
            await this.ratingService.addRating(rating);
            res.sendStatus(201);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateRating(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        const rating: Rating = req.body;
        rating.id = id;
        try {
            await this.ratingService.updateRating(rating);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

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
}

const ratingRepository = new RatingRepository();
const ratingService = new RatingService(ratingRepository);
const ratingController = new RatingController(ratingService);
const router = express.Router();

router.get('/ratings', ratingController.getAllRatings.bind(ratingController));
router.get('/ratings/:id', ratingController.getRatingById.bind(ratingController));
router.post('/ratings', ratingController.addRating.bind(ratingController));
router.put('/ratings/:id', ratingController.updateRating.bind(ratingController));
router.delete('/ratings/:id', ratingController.deleteRating.bind(ratingController));

export { router };

