import { Rating } from '../domain/model/Rating';
import { RatingRepository } from '../domain/data-access/rating.db';

export class RatingService {
    constructor(private readonly ratingRepository: RatingRepository) {}

    public async getAllRatings(): Promise<Rating[]> {
        return this.ratingRepository.getAll();
    }

    public async getRatingById(id: number): Promise<Rating | null> {
        return this.ratingRepository.getById(id);
    }

    public async addRating(rating: Rating): Promise<void> {
        await this.ratingRepository.add(rating);
    }

    public async updateRating(rating: Rating): Promise<void> {
        await this.ratingRepository.update(rating);
    }

    public async deleteRating(rating: Rating): Promise<void> {
        await this.ratingRepository.remove(rating);
    }
}
