const Data = require("../models/tiic.model");
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
const MODEL_NAME = "models/text-bison-001";

const getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addData = async (req, res) => {
  const newData = new Data(req.body);

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getData = async (req, res) => {
  try {
    let pompt = req.body;
    console.log(pompt);
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(process.env.apikey),
    });
    const prompt =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      pompt +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Dangal, PK, 3 Idiots, Dilwale Dulhania Le Jayenge, Sholay, Andaz Apna Apna, Lagaan, Kabhi Khushi Kabhie Gham, Queen, Gully Boy, Rang De Basanti, Baahubali: The Beginning, Baahubali 2: The Conclusion, Robot, Kabali, KGF: Chapter 1, Dabangg, Bajrangi Bhaijaan, Padmaavat, Dhoom, Mughal-E-Azam, Amar Akbar Anthony, Hera Pheri, Golmaal, Om Shanti Om, Dil Chahta Hai, Chak De! India, Barfi!, Kal Ho Naa Ho, Devdas, Kabir Singh, Uri: The Surgical Strike, Zindagi Na Milegi Dobara, Kuch Kuch Hota Hai, My Name Is Khan, Haider, Dil To Pagal Hai, Piku, Veer-Zaara, Kabhi Alvida Naa Kehna, Jodhaa Akbar, Barfi!, Rockstar, Taare Zameen Par, Jo Jeeta Wohi Sikandar, Hum Dil De Chuke Sanam, Munna Bhai M.B.B.S., Gangs of Wasseypur, Badhaai Ho, Article 15, The Dark Knight, Inception, Forrest Gump, Pulp Fiction, The Shawshank Redemption, The Godfather, Titanic, Jurassic Park, The Matrix, Avatar, Gladiator, Schindler's List, The Lord of the Rings: The Fellowship of the Ring, The Lion King, Casablanca, Gone with the Wind, Jaws, E.T. the Extra-Terrestrial, Star Wars: Episode IV - A New Hope, The Sound of Music, Braveheart, The Silence of the Lambs, The Terminator, The Wizard of Oz, Back to the Future,Memento, The Departed, Interstellar, The Prestige, Whiplash, La La Land, Joker, The Revenant, A Beautiful Mind, Slumdog Millionaire, Inglourious Basterds, The Grand Budapest Hotel, Fight Club, The Social Network, The Shining, Goodfellas, The Great Gatsby, The Dark Knight Rises, Gravity, The Martian, The Avengers, Black Panther, The Shape of Water, Get Out, Mad Max: Fury Road, The Big Lebowski, No Country for Old Men, Eternal Sunshine of the Spotless Mind, Blade Runner 2049, The Breakfast Club, A Clockwork Orange, Amélie, The Green Mile, The Usual Suspects, Schindler's List, Lawrence of Arabia, 2001: A Space Odyssey, Casablanca, Citizen Kane, Psycho, Vertigo, Chinatown, The Good, the Bad and the Ugly, Seven Samurai, Spirited Away, Akira, The Godfather Part II, Taxi Driver, Reservoir Dogs, The Sixth Sense, The Godfather, Pulp Fiction, The Shawshank Redemption, Titanic, Jurassic Park, The Matrix, Avatar, Gladiator, Schindler's List, The Lord of the Rings: The Fellowship of the Ring, The Lion King, Casablanca, Gone with the Wind, Jaws, E.T. the Extra-Terrestrial, Star Wars: Episode IV - A New Hope, The Sound of Music, Braveheart, The Silence of the Lambs, The Terminator";

    client
      .generateText({
        model: MODEL_NAME,
        prompt: {
          text: prompt,
        },
      })
      .then((result) => {
        const response = convertText(result[0]?.candidates[0]?.output);
        res.status(201).json(response);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function convertText(inputText) {
  // Split the input text by newline character
  var moviesArray = inputText.split("\n");

  // Remove the first element (empty string) and trim whitespaces
  moviesArray.shift();

  // Iterate through the array and format each movie name
  for (var i = 0; i < moviesArray.length; i++) {
    // Extract the movie name without the numbering and trim whitespaces
    moviesArray[i] = moviesArray[i].replace(/^\d+\.\s*/, "").trim();
  }

  // Join the array elements with a comma and space
  var outputText = moviesArray.join(", ");

  return outputText;
}

module.exports = {
  getAllData,
  addData,
  getData,
};
