import { PrismaClient } from '@prisma/client';
import { Rating } from '../model/Rating';
import { mapToRating , mapToRatings} from "./rating.mapper";

class RatingRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getById(id: number): Promise<Rating> {
        const rating = await this.prisma.rating.findUnique({
            where: {
                ratingid: id,
            },
        });
        if (!rating) {
            throw new Error(`Rating with id ${id} not found`);
        }
        return mapToRating(rating);
    }

    async getAll(): Promise<Rating[]> {
        const ratings = await this.prisma.rating.findMany();
        return mapToRatings(ratings);
    }

    async add(rating: Rating): Promise<void> {
        await this.prisma.rating.create({
            data: {
                rating: rating.rating,
                comment: rating.comment,
                movieId: rating.movieid,
                userId: rating.userid,
            },
        });
    }

    async update(id: number, rating: Rating): Promise<void> {
        await this.prisma.rating.update({
            where: {
                ratingid: id,
            },
            data: {
                rating: rating.rating,
                userId: rating.userid,
                movieId: rating.movieid,
            },
        });
    }

    async remove(rating: Rating): Promise<void> {
        await this.prisma.rating.delete({
            where: {
                ratingid: rating.ratingid,
            },
        });
    }

    async close(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export { RatingRepository };
