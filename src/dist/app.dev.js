"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var cors = require("cors");

var _require = require("uuidv4"),
    uuid = _require.uuid,
    isUuid = _require.isUuid;

var app = express();
app.use(express.json());
app.use(cors());
var repositories = [];

function validateRepositoryId(request, response, next) {
  var id = request.params.id;

  if (!isUuid(id)) {
    return response.status(400).json({
      error: 'Invalid Repository ID!'
    });
  }

  return next();
}

app.use('/repositories/:id', validateRepositoryId);
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
app.put("/repositories/:id", function (request, response) {
  var id = request.params.id;
  var _request$body2 = request.body,
      title = _request$body2.title,
      url = _request$body2.url,
      techs = _request$body2.techs;
  var repositoryIndex = repositories.findIndex(function (repository) {
    return repository.id === id;
  });

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: 'Repository Not Found!'
    });
  }

  repo = repositories[repositoryIndex];

  var repository = _objectSpread({}, repo, {
    url: url,
    title: title,
    techs: techs
  });

  repositories[repositoryIndex] = repository;
  return response.json(repository);
});
app["delete"]("/repositories/:id", function (request, response) {
  var id = request.params.id;
  var repositoryIndex = repositories.findIndex(function (repositories) {
    return repositories.id === id;
  });

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: 'Repository Not Found!'
    });
  }

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});
app.post("/repositories/:id/like", function (request, response) {
  var id = request.params.id;
  var repository = repositories.find(function (repository) {
    return repository.id === id;
  });

  if (!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;
  return response.json(repository);
});
module.exports = app;