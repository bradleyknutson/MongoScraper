# MongoScraper

## Description
MongoScraper is a proof of concept design based around a web scraper, specifically Cheerio, that is used to pull articles from the New York Times and add them to a Mongo database. 

## Demo
![MongoScraper](https://i.imgur.com/01bfXqw.png)
Link to deployment: https://du-mongo-scraper.herokuapp.com/

## Comments
Comments can be added for signed-in users, and only the owner of those comments has the option to delete them. 
![Delete Comment Button](https://i.imgur.com/nbFq8Au.png)


## Installation
* Clone MongoScraper repository.
* While in the MongoScraper directory: run `npm i` to install dependencies.
* From the config folder, create a .env file with the following requirements:
* * MONGODB_URI=
* * SESSION_SECRET=
* Run `npm start` to start the Express server.
* Navigate to http://localhost:3000 to see the home page of the app.


## Frameworks
* ### npm
* * Express
* * Axios
* * Cheerio
* * passport/bcrypt-js
* * express-handlebars and handlebars-helpers
* * MongoDB with Mongoose
* ### CSS
* * Bootstrap
* * SCSS

## Roadmap
* Add options to scrape other sections of the NYT or other webpages