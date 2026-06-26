//You will create, configure, and run your server from this file
//Lecture Code Reference -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/app.js

/*

Lab Requirements:

-You must not submit your node_modules folder

-You must remember to save your dependencies to your package.json folder

-You must remember to update your package.json file to set app.js as your starting script!

-You must submit a zip archive or you will lose points, named in the following format: LastName_FirstName_CS546_SECTION.zip  You will lose points for not submitting an archive.

-DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM PACKAGE.JSON (OR package-lock.json) FILE.

-Do not forget the start command and the "type": "module" property in package.json

-- Do not forget to add the seed task to the package.json!! the seed file is in /tasks/seed.js

Once you add the seed task to the package.json, you can run npm run seed to seed the database with 20 bands so you can test out your functions. 
*/

import express from 'express';
import configRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
