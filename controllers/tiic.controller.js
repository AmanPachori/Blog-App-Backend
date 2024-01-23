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
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

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
