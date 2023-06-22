// importeer packages van uit node modules
const express = require("express");
const fetch = require("node-fetch");
// const postJson = require("./helpers/fetchWrapper.js");

//start server met express
const server = express();
// api url as constant onstellen
const url = "https://api.buurtcampus-oost.fdnd.nl/api/v1/";
const query = "stekjes";
//setup server poort

const port = 2000;
server.set(port);
server.listen(port),
  () => {
    console.log("http://localhost:" + port);
  };

// standaard instellen voor data verwerking
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//aangeven hoe de view gerendered moet worden
server.set("view engine", "ejs");
server.set("views", "views");

// public map linken aan ejs
server.use(express.static("public"));

//route voor homepage
server.get("/", function (request, response) {
  // const url = 'https://api.buurtcampus-oost.fdnd.nl/api/v1/'
  // const query = 'stekjes'

  fetch(url + query)
    .then((response) => response.json())
    .then((data) => {
      response.render("index", {
        stekjes: data.stekjes,
      });
    })
    .catch((err) => console.error(err));
});

// Toon het formulier om een nieuwe member aan te maken
server.get("/nieuw-stekje", (request, response) => {
  response.render("form.ejs");
});
  async function postJson(postUrl, body) {
    return await fetch(postUrl, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .catch((error) => error)
  }
// Handel het versturen van het formulier af
server.post("/nieuw-stekje", (request, response) => {
  // Roep de API aan met de post methode
  const postUrl = url + "stekjes";


  postJson(postUrl, request.body).then((data) => {
    console.log(data);

    if (data.success) {
      response.redirect("/"); 
    } else {
      console.log("oops");
    }
  });



});

async function postJson(postUrl, body) {
      return await fetch(postUrl, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .catch((error) => error)
    }
