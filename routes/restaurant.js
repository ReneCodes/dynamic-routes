//Third party packages
const express = require("express");
const uuid = require("uuid");

const router = express.Router(); //
const resData = require("../util/restaurant-data"); //starting with ./ to make clear that this path is relative from app.js

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === 'desc'){
      nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestaurants();
  // .sort() is a built-in method that can be called on any array to sort the item in that array.
  //here alphabetically by name:
  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurantObject of storedRestaurants) {
    if (restaurantObject.id === restaurantId) {
      return res.render("restaurant-detail", {
        restaurantProp: restaurantObject,
      });
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4(); //access a property that doesn't exist in the object -> JS will create the property

  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router; //router is already an object
