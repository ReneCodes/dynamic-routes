const fs = require("fs");
const path = require("path");

// with '..' you jump up to the parent directory
//relative to the path this file is in
const filePath = path.join(__dirname,'..', "data", "restaurants.json");

function getStoredRestaurants() {

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRestaurants(writeRestaurant){
  fs.writeFileSync(filePath, JSON.stringify(writeRestaurant));
}

//it is required in node to mark what can be exposed to other files
//in general nothing gets exposed without permission
//EXPORTED DATA MUSST BE AN OBJECT!!!
module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants
}
  // functionNameUsedToAccess: functionNameOfJsFile
  // commonly the same name is used