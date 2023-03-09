import { Rating } from '../model/Rating';

class RatingRepository {
    private ratings: Rating[];
    private lastId: number;


    async getById(id: number): Promise<Rating> {
        const rating = this.ratings.find((r) => r.id === id);
        if (!rating) {
            throw new Error(`Rating with id ${id} not found`);
        }
        return rating;
    }

    async getAll(): Promise<Rating[]> {
        return this.ratings;
    }

    async add(rating: Rating): Promise<void> {
        rating.id = ++this.lastId;
        this.ratings.push(rating);
    }

    async update(rating: Rating): Promise<void> {
        const index = this.ratings.findIndex((r) => r.id === rating.id);
        if (index === -1) {
            throw new Error(`Rating with id ${rating.id} not found`);
        }
        this.ratings[index] = rating;
    }

    async remove(rating: Rating): Promise<void> {
        const index = this.ratings.findIndex((r) => r.id === rating.id);
        if (index === -1) {
            throw new Error(`Rating with id ${rating.id} not found`);
        }
        this.ratings.splice(index, 1);
    }
}

export { RatingRepository };
