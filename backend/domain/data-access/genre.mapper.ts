import { Genre as PrismaGenre } from "@prisma/client";
import { Genre } from '../model/Genre';
export const mapToGenre = (

    {
                               genreid,
                               name,
                               description,

}: PrismaGenre): Genre => {
    console.log(genreid +" " + name +" "+ description);
    return new Genre(
        genreid,
        name,
        description);};

export const mapToGenres = (prismaGenres: PrismaGenre[]): Genre[] => {
    return prismaGenres.map((prismaGenre) =>
        mapToGenre(prismaGenre));
};

export default { mapToGenre, mapToGenres };
