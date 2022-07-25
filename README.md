**_ Set up instructions _**

Welcome to my NC-News project!

Here you will find a news API where you can view information on articles, users, topics and any comments surrounding this. Multiple paths are accessible, allowing you to GET data, POST data, DELETE data and PATCH/amend data.

In order to get things up and running, any developers will firstly need to do the following

- Fork this repository and clone it to your device.
- Install all dependencies by running 'npm install'
- You will then need to seed the data base by running 'npm run seed'
- All Node modules must be installed.

You will need to add two .env files when pulling this repo: `.env.test` and `.env.development`. Into each, add `PGDATABASE=nc_news` (add \_test at the end for the .env.test file) Double check that these .env files are .gitignored!

- To run tests you will need to run 'npm run test'

**_ Dependencies: _**

Postgres - npm i pg
Postgres Format - npm i pg format
Dotenv - npm i dotenv --save
Express - npm i express
Nodemon - npm i nodemon

**_ Dev dependencies: _**

Jest - npm i jest -D
Supertest - npm i supertest -D
Jest sorted - npm i jest sorted -D

Here is the link to the hosted app on Heroku:
https://adam-nc-news.herokuapp.com/api/ + the path you wish to search (Paths can be found within the endpoints.json)

Enjoy!
