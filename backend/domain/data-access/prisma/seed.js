// seed.js

const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();

async function seed() {
    try {
        const genresList = [
            { name: 'Science Fiction', description: 'A genre of speculative fiction that typically deals with imaginative and futuristic concepts.' },
            { name: 'Fantasy', description: 'A genre of speculative fiction set in a fictional universe, often inspired by real world myth and folklore.' },
            { name: 'Mystery', description: 'A genre of fiction that deals with the solution of a crime or the unraveling of secrets.' },
            { name: 'Romance', description: 'A genre of fiction that places its primary focus on the relationship and romantic love between two people.' },
            { name: 'Horror', description: 'A genre of speculative fiction which is intended to frighten, scare, or disgust.' },
            { name: 'Thriller', description: 'A genre of fiction that uses suspense, tension, and excitement as its main elements.' },
            { name: 'Western', description: 'A genre of fiction set in the American Old West frontier and typically set in the late eighteenth to late nineteenth century.' },
            { name: 'Dystopian', description: 'A genre of speculative fiction that focuses on dehumanizing and fearful futures.' },
            { name: 'Comedy', description: 'A genre of fiction that is designed to be humorous or amusing by inducing laughter.' },
            { name: 'Historical Fiction', description: 'A genre of fiction that is set in the past and pays attention to the manners, social conditions and other details of the period depicted.' }
        ];

        const users = [
            { username: 'user0', email: 'user0@example.com', birthdate: '1990-07-01', password: 'user0' },
            { username: 'user1', email: 'user1@example.com', birthdate: '2002-01-01', password: 'user1' },
            { username: 'user2', email: 'user2@example.com', birthdate: '1994-01-01', password: 'user2' },
            { username: 'user3', email: 'user3@example.com', birthdate: '1985-05-12', password: 'user3' },
            { username: 'user4', email: 'user4@example.com', birthdate: '1998-09-20', password: 'user4' },
            { username: 'user5', email: 'user5@example.com', birthdate: '1992-03-15', password: 'user5' },
            { username: 'user6', email: 'user6@example.com', birthdate: '1987-11-03', password: 'user6' },
            { username: 'user7', email: 'user7@example.com', birthdate: '1996-12-25', password: 'user7' },
            { username: 'user8', email: 'user8@example.com', birthdate: '1991-08-10', password: 'user8' },
            { username: 'user9', email: 'user9@example.com', birthdate: '1999-04-18', password: 'user9' },
            { username: 'user10', email: 'user10@example.com', birthdate: '1993-06-30', password: 'user10' },
        ];

        const movieList = [
            { title: 'The Dark Knight', releaseDate: '2008-07-18', duration: 152, genreIds: [1, 8] },
            { title: 'Inception', releaseDate: '2010-07-16', duration: 148, genreIds: [1, 3, 8] },
            { title: 'The Shawshank Redemption', releaseDate: '1994-09-23', duration: 142, genreIds: [10] },
            { title: 'Pulp Fiction', releaseDate: '1994-10-14', duration: 154, genreIds: [10, 8] },
            { title: 'The Godfather', releaseDate: '1972-03-24', duration: 175, genreIds: [10, 8] },
            { title: 'Fight Club', releaseDate: '1999-10-15', duration: 139, genreIds: [10] },
            { title: 'Forrest Gump', releaseDate: '1994-07-06', duration: 142, genreIds: [10, 6, 9] },
            { title: 'The Matrix', releaseDate: '1999-03-31', duration: 136, genreIds: [1, 3] },
            { title: 'The Lord of the Rings: The Fellowship of the Ring', releaseDate: '2001-12-19', duration: 178, genreIds: [2, 4, 1] },
            { title: 'Goodfellas', releaseDate: '1990-09-19', duration: 145, genreIds: [8, 10] }
        ];
        const ratings = [
            { rating: 8, comment: "Geweldige film!", movieId: 2, userId: 1 },
            { rating: 9, comment: "Een meesterwerk!", movieId: 2, userId: 3 },
            { rating: 7, comment: "Interessant verhaal", movieId: 3, userId: 2 },
            { rating: 8, comment: "Indrukwekkende acteerprestaties", movieId: 4, userId: 4 },
            { rating: 9, comment: "Klassieker die je gezien moet hebben", movieId: 6, userId: 5 },
            { rating: 8, comment: "Goed gemaakte film", movieId: 8, userId: 6 },
            { rating: 8, comment: "Spannend tot het einde", movieId: 9, userId: 8 },
            { rating: 9, comment: "Episch avontuur!", movieId: 10, userId: 9 },
            { rating: 7, comment: "Interessant concept", movieId: 10, userId: 10 },
            { rating: 8, comment: "Leuke komedie", movieId: 2, userId: 7 },
            { rating: 8, comment: "Prachtige cinematografie", movieId: 3, userId: 1 },
            { rating: 8, comment: "Aangrijpend verhaal", movieId: 4, userId: 3 },
            { rating: 8, comment: "Geweldige actie-sequenties", movieId: 5, userId: 4 },
            { rating: 9, comment: "Ontroerend romantisch drama", movieId: 8, userId: 5 },
            { rating: 7, comment: "Goed geacteerd misdaadverhaal", movieId: 10, userId: 7 },
            { rating: 8, comment: "Spannende sciencefiction", movieId: 9, userId: 1 },
            { rating: 8, comment: "Grappige komedie", movieId: 10, userId: 1 },
            { rating: 8, comment: "Verbluffende visuele effecten", movieId: 3, userId: 10 },
            { rating: 9, comment: "Meeslepend mysterie", movieId: 7, userId: 10 },
            { rating: 8, comment: "Hartverwarmend avontuur", movieId: 6, userId: 2 }
        ];





        for (const genre of genresList) {
            await prisma.genre.create({
            data:
                {
                    name: genre.name,
                    description: genre.description,
                }
        });
        }


        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await prisma.user.create({
                data:
                    {
                        username: user.username,
                        email: user.email,
                        birthdate: new Date(user.birthdate),
                        password: hashedPassword,
                    }
            });
        }


        for (const movie of movieList) {
            const releaseDate = new Date(movie.releaseDate).toISOString();
            await prisma.movie.create({
                data:
                    {
                        title: movie.title,
                        releaseDate: releaseDate,
                        duration: movie.duration,
                        genres: {
                            connect: movie.genreIds.map((id) => ({ genreid: id })),
                        },
                        ratings: {},
                        users: {},
                    }
            });
        }

        for (const rating of ratings) {
            await prisma.rating.create({
                data:
                    {
                        rating: rating.rating,
                        comment: rating.comment,
                        movieid: rating.movieId,
                        userid: rating.userId,
                    }
            });
        }





        console.log("Demo-gegevens zijn succesvol ingevoegd.");
    } catch (error) {
        console.error("Er is een fout opgetreden bij het invoegen van demo-gegevens:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
