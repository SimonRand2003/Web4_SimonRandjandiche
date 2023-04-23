import { Genre as PrismaGenre } from "@prisma/client";
import { Genre } from '../model/Genre';
const mapToGenre = (prismaGenre: PrismaGenre): Genre => {
    return new Genre(prismaGenre.genreid, prismaGenre.name, prismaGenre.description);
}

const mapToGenres = (prismaGenres: PrismaGenre[]): Genre[] => {
    return prismaGenres.map((prismaGenre) => mapToGenre(prismaGenre));
};

export { mapToGenre, mapToGenres };
