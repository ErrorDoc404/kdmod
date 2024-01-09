const api = require("express").Router();
const { Collection } = require("discord.js");
const { join } = require("path");
const fs = require("fs");

api.get("/", (req, res) => {
    res.json({ msg: "hello" });
});

module.exports = api;