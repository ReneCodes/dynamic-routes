
const express = require('express');

const router = express.Router(); // Router gives us a router Object which works a bit like app, but internally is a bit different

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router; //router is already an object