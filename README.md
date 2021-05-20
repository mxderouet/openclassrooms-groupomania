# OpenClassrooms-Groupomania

This is the 7th and last project of the Web Developer program from OpenClassrooms. This project is a social network for Groupomania.

You will need `npm`, then 
`npm install` in both back-end & front-end folders

- back-end start:
`npm start`
You will need to retrieve the `.env` file separatly and add it to the back-end folder

- front-end start:
`npm start`

- database start: 

1. Install mySQL. Locally create the "groupomania_development" MySQL's database

2. Go to `back-end/config/config.json` and add your credentials for the development database

3. In the command prompt go to the `/back-end` folder, then type  `sequelize db: create` & `sequelize db: migrate` (sequelize-cli is required)
