// Library of Movies
var tempArray = [{title: "Avatar", poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"}, 
                {title: "Fall", poster: "https://m.media-amazon.com/images/M/MV5BNGI3MWYwYjItNzZhYi00ZWIzLTkyMzYtN2JmNjg3ODg1NTg4XkEyXkFqcGdeQXVyMTMwMDA5ODU3._V1_SX300.jpg"}, 
                {title: "Puss in Boots", poster: "https://m.media-amazon.com/images/M/MV5BMTMxMTU5MTY4MV5BMl5BanBnXkFtZTcwNzgyNjg2NQ@@._V1_SX300.jpg"}, 
                {title: "Inception", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"}, 
                {title: "Titanic", poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}, 
                {title: "Squid Game", poster: "https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg"}, 
                {title: "Nomadland", poster: "https://m.media-amazon.com/images/M/MV5BMDRiZWUxNmItNDU5Yy00ODNmLTk0M2ItZjQzZTA5OTJkZjkyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"}, 
                {title: "Parasite", poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"}, 
                {title: "No Time to Die ", poster: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"}, 
                {title: "A Man Called Otto", poster: "https://m.media-amazon.com/images/M/MV5BNzg3OTEzMTgtYWU0OC00YTI0LWIxOTAtNmRkNTc0Nzg2YWU1XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg"}, 
                {title: "The Whale", poster: "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg"}, 
                {title: "Tetris", poster: "https://m.media-amazon.com/images/M/MV5BZmZmNTdiYjMtZDdmNi00ZGU4LThkYmQtZTFhZWNlYmUxYWZkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"}, 
                {title: "Don't Worry Darling", poster: "https://m.media-amazon.com/images/M/MV5BMzFkMWUzM2ItZWFjMi00NDY0LTk2MDMtZDhkMDE2MjRlYmZlXkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SX300.jpg"}, 
                {title: "Bullet Train", poster: "https://m.media-amazon.com/images/M/MV5BMDU2ZmM2OTYtNzIxYy00NjM5LTliNGQtN2JmOWQzYTBmZWUzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"}, 
                {title: "Avatar: The Way of Water", poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg"}, 
                {title: "Plane", poster: "https://m.media-amazon.com/images/M/MV5BZDc4MzVkNzYtZTRiZC00ODYwLWJjZmMtMDIyNjQ1M2M1OGM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"}, 
                {title: "Ad Astra", poster: "https://m.media-amazon.com/images/M/MV5BZTllZTdlOGEtZTBmMi00MGQ5LWFjN2MtOGEyZTliNGY1MzFiXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"}, 
                {title: "Guardians of the Galaxy", poster: "https://m.media-amazon.com/images/M/MV5BNDIzMTk4NDYtMjg5OS00ZGI0LWJhZDYtMzdmZGY1YWU5ZGNkXkEyXkFqcGdeQXVyMTI5NzUyMTIz._V1_SX300.jpg"}, 
                {title: "BlackBerry", poster: "https://m.media-amazon.com/images/M/MV5BOTFlNDljMDctMjgyZi00NjIwLWIzOWEtMDMxNmI3OTBjMGVhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"}, 
                {title: "Air", poster: "https://m.media-amazon.com/images/M/MV5BYmNlOTNlYjUtM2U3Yy00M2ZjLTkxZDQtN2NiNGZiZDI0ZjE3XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg"}, 
                {title: "Dungeons & Dragons: Honor Among Thieves", poster: "https://m.media-amazon.com/images/M/MV5BNmFkN2M2NzItOTY5YS00MmE2LTk3ZjctNTk2YzQ5ZmRiYzJjXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg"}, 
                {title: "Book Club: The Next Chapter", poster: "https://m.media-amazon.com/images/M/MV5BNGM0ZmFiYmEtMzMxOC00YWFlLWE4YzQtYzk2Y2NjNzZjYzA1XkEyXkFqcGdeQXVyMTQzNTA5MzYz._V1_SX300.jpg"}, 
                {title: "The Artifice Girl", poster: "https://m.media-amazon.com/images/M/MV5BYzE1MWRkODQtNzdjZC00ODEyLWJkNDMtYzFiZjljNDIwNzRkXkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_SX300.jpg"}, 
                {title: "The Pope's Exorcist", poster: "https://m.media-amazon.com/images/M/MV5BYjA0MGU4MzYtYTYxMy00MjRhLTlmMDYtZTVhZDc1Y2QwNWY2XkEyXkFqcGdeQXVyMjY5ODI4NDk@._V1_SX300.jpg"}, 
                {title: "Ant-Man and the Wasp: Quantumania", poster: "https://m.media-amazon.com/images/M/MV5BODZhNzlmOGItMWUyYS00Y2Q5LWFlNzMtM2I2NDFkM2ZkYmE1XkEyXkFqcGdeQXVyMTU5OTA4NTIz._V1_SX300.jpg"}, 
                {title: "John Wick: Chapter 4", poster: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"}, 
                {title: "The Godfather", poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"}, 
                {title: "In the Mood for Love", poster: "https://m.media-amazon.com/images/M/MV5BYWVjNjMwZTgtMGYyYy00NmVhLWE1NDItMzFhMmJkYTNjYWIwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"}, 
                {title: "Singin' in the Rain", poster: "https://m.media-amazon.com/images/M/MV5BZDRjNGViMjQtOThlMi00MTA3LThkYzQtNzJkYjBkMGE0YzE1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg"}, 
                {title: "The Dark Knight", poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"}, 
                {title: "City Lights", poster: "https://m.media-amazon.com/images/M/MV5BY2I4MmM1N2EtM2YzOS00OWUzLTkzYzctNDc5NDg2N2IyODJmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"}, 
                {title: "Slumdog Millionaire", poster: "https://m.media-amazon.com/images/M/MV5BZmNjZWI3NzktYWI1Mi00OTAyLWJkNTYtMzUwYTFlZDA0Y2UwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"}, 
                {title: "Jaws", poster: "https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"}, 
                {title: "Star Wars: Episode IV - A New Hope", poster: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"}, 
                {title: "The Truman Show", poster: "https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"}, 
                {title: "Psycho", poster: "https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"}, 
                {title: "Lost in Translation", poster: "https://m.media-amazon.com/images/M/MV5BMTUxMzk0NDg1MV5BMl5BanBnXkFtZTgwNDg0NjkxMDI@._V1_SX300.jpg"}, 
                {title: "Modern Times", poster: "https://m.media-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"}, 
                {title: "Top Gun: Maverick", poster: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg"}, 
                {title: "Joker", poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"}, 
                {title: "Once Upon a Time in Hollywood", poster: "https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg"}, 
                {title: "La La Land", poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg"}, 
                {title: "The Danish Girl", poster: "https://m.media-amazon.com/images/M/MV5BMjA0NjA4NjE2Nl5BMl5BanBnXkFtZTgwNzIxNTY2NjE@._V1_SX300.jpg"}, 
                {title: "The Theory of Everything", poster: "https://m.media-amazon.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX300.jpg"}, 
                {title: "Frozen", poster: "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg"}, 
                {title: "Life of Pi", poster: "https://m.media-amazon.com/images/M/MV5BNTg2OTY2ODg5OF5BMl5BanBnXkFtZTcwODM5MTYxOA@@._V1_SX300.jpg"}, 
                {title: "Les Misérables", poster: "https://m.media-amazon.com/images/M/MV5BZmQ0NzI1OTQtMTJjOC00NzZlLWJkOGEtZTQ1MmJmMjU1ZjkxXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SX300.jpg"}, 
                {title: "The Iron Lady", poster: "https://m.media-amazon.com/images/M/MV5BODEzNDUyMDE3NF5BMl5BanBnXkFtZTcwMTgzOTg3Ng@@._V1_SX300.jpg"}, 
                {title: "The King's Speech", poster: "https://m.media-amazon.com/images/M/MV5BMzU5MjEwMTg2Nl5BMl5BanBnXkFtZTcwNzM3MTYxNA@@._V1_SX300.jpg"}, 
                {title: "Italian Job", poster: "https://m.media-amazon.com/images/M/MV5BMDE1ODU2YWYtMTFlMS00ZTk0LWI0NzUtMzIzZmM4MzA0NTcyXkEyXkFqcGdeQXVyNTkwMTc4NzY@._V1_SX300.jpg"},
                ];

                var availableTags = ["The Godfather",
                "Italian Job",
                "The Shawshank Redemption",
                "Pulp Fiction", 
                "Fight Club", 
                "The Dark Knight",
                "Forrest Gump", 
                "Inception",
                "Schindler's List",
                "The Matrix",
                "Top Gun: Maverick",
                "The Lion King",
                "Titanic",
                "The Lord of the Rings: The Fellowship of the Ring",
                "The Lord of the Rings: The Two Towers",
                "The Lord of the Rings: The Return of the King",
                "Star Wars: Episode IV - A New Hope",
                "Star Wars: Episode V - The Empire Strikes Back",
                "Star Wars: Episode VI - Return of the Jedi",
                "Toy Story",
                "Toy Story 2",
                "Toy Story 3",
                "Toy Story 4",
                "Avatar",
                "Jurassic Park",
                "Indiana Jones: Raiders of the Lost Ark",
                "Indiana Jones and the Temple of Doom",
                "Indiana Jones and the Last Crusade",
                "Indiana Jones and the Kingdom of the Crystal Skull",
                "Gladiator",
                "Braveheart",
                "Die Hard",
                "Die Hard 2",
                "Die Hard with a Vengeance",
                "Lethal Weapon",
                "Lethal Weapon 2",
                "Lethal Weapon 3",
                "Lethal Weapon 4",
                "The Terminator",
                "Terminator 2: Judgment Day",
                "Terminator 3: Rise of the Machines",
                "Terminator: Dark Fate",
                "Alien",
                "Aliens",
                "Alien 3",
                "Alien: Resurrection",
                "Predator",
                "Predator 2",
                "Predators",
                "The Predator",
                "Back to the Future",
                "Back to the Future Part II",
                "Back to the Future Part III",
                "Mad Max",
                "Mad Max 2: The Road Warrior",
                "Mad Max Beyond Thunderdome",
                "Mad Max: Fury Road",
                "Rocky",
                "Rocky II",
                "Rocky III",
                "Rocky IV",
                "Rocky V",
                "Rocky Balboa",
                "Creed",
                "Creed II",
                "Rambo: First Blood",
                "Rambo: First Blood Part II",
                "Rambo III",
                "Rambo",
                "Rambo: Last Blood",
                "The Expendables",
                "The Expendables 2",
                "The Expendables 3",
                "Iron Man",
                "Iron Man 2",
                "Iron Man 3",
                "Thor",
                "Thor: The Dark World",
                "Thor: Ragnarok",
                "Captain America: The First Avenger",
                "Captain America: The Winter Soldier",
                "Captain America: Civil War",
                "The Avengers",
                "Avengers: Age of Ultron",
                "Avengers: Infinity War",
                "Avengers: Endgame",
                "Guardians of the Galaxy",
                "Guardians of the Galaxy Vol. 2",
                "Spider-Man",
                "Spider-Man 2",
                "Spider-Man 3",
                "The Amazing Spider-Man",
                "The Amazing Spider-Man 2",
                "Spider-Man: Homecoming",
                "Spider-Man: Far From Home",
                "Spider-Man: No Way Home",
                "Batman",
                "Batman Returns",
                "Batman Forever",
                "Batman & Robin",
                "Batman Begins",
                "The Dark Knight",
                "The Dark Knight Rises",
                "Superman",
                "Superman II",
                "Superman III",
                "Superman IV: The Quest for Peace",
                "The Wizard of Oz",
                "Psycho",
                "12 Angry Men",
                "Rear Window",
                "Lawrence of Arabia",
                "Citizen Kane",
                "Casablanca",
                "Gone with the Wind",
                "Ben-Hur",
                "Singin' in the Rain",
                "Vertigo",
                "One Flew Over the Cuckoo's Nest",
                "To Kill a Mockingbird",
                "The Silence of the Lambs",
                "It's a Wonderful Life",
                "2001: A Space Odyssey",
                "The Good, the Bad and the Ugly",
                "Taxi Driver",
                "Apocalypse Now",
                "Jaws",
                "The Shining",
                "E.T. The Extra-Terrestrial",
                "The Great Dictator",
                "Seven Samurai",
                "The Usual Suspects",
                "Goodfellas",
                "The Pianist",
                "Once Upon a Time in America",
                "No Country for Old Men",
                "American Beauty",
                "The Sixth Sense",
                "Slumdog Millionaire",
                "Requiem for a Dream",
                "Braveheart",
                "The Departed",
                "Memento",
                "The Prestige",
                "The Incredibles",
                "Up",
                "Finding Nemo",
                "Inside Out",
                "Monsters, Inc.",
                "Coco",
                "Toy Story 4",
                "Shrek",
                "Shrek 2",
                "Shrek the Third",
                "Shrek Forever After",
                "Spirited Away",
                "My Neighbor Totoro",
                "Princess Mononoke",
                "Howl's Moving Castle",
                "Ponyo",
                "The Secret World of Arrietty",
                "A Beautiful Mind",
                "The Big Lebowski",
                "The Grand Budapest Hotel",
                "The Royal Tenenbaums",
                "Moonrise Kingdom",
                "Boyhood",
                "Whiplash",
                "La La Land",
                "Birdman",
                "The Revenant",
                "Gravity",
                "12 Years a Slave",
                "Django Unchained",
                "Inglourious Basterds",
                "Reservoir Dogs",
                "Kill Bill: Volume 1",
                "Kill Bill: Volume 2",
                "Oldboy",
                "A Clockwork Orange",
                "The Exorcist",
                "The Ring",
                "The Grudge",
                "Paranormal Activity",
                "The Conjuring",
                "The Conjuring 2",
                "The Conjuring: The Devil Made Me Do It",
                "It",
                "It Chapter Two",
                "A Nightmare on Elm Street",
                "Friday the 13th",
                "Halloween",
                "Scream",
                "Scream 2",
                "Scream 3",
                "Scream 4",
                "Get Out",
                "Us",
                "Saw",
                "Saw II",
                "Saw III",
                ];
                