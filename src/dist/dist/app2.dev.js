"use strict";

var express = require("express");

var cors = require("cors");

var _require = require("uuidv4"),
    uuid = _require.uuid;

var app = express();
app.use(express.json());
app.use(cors());
var repositories = [];
app.get("/repositories", function (request, response) {
  return response.json(repositories);
});
app.post("/repositories", function (request, response) {
  var _request$body = request.body,
      title = _request$body.title,
      url = _request$body.url,
      techs = _request$body.techs;
  var repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };
  repositories.push(repository);
  return response.json(repository);
});
app.put("/repositories/:id", function (request, response) {// TODO
});
app["delete"]("/repositories/:id", function (request, response) {// TODO
});