import { Rating as PrismaRating } from "@prisma/client";
import { Rating } from "../model/Rating";



const mapToRating = (prismaRating: PrismaRating): Rating => {
    return new Rating(
        prismaRating.ratingid,
        prismaRating.rating,
        prismaRating.comment,
        prismaRating.movieId,
        prismaRating.userId,
    );
}
const mapToRatings = (prismaRatings: PrismaRating[]): Rating[] => {
    return prismaRatings.map((prismaRating) => mapToRating(prismaRating));


};


export {mapToRating, mapToRatings};

