/*You will code the route in this file
Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

You will import express and the router as shown in the lecture code.*/
import { Router } from 'express';
import { ObjectId } from 'mongodb';

// You will import the getAllBands() and getBandById(id) functions in the ../data/bands.js file to return the list of bands and get a band by the id.
import { getAllBands, getBandById } from '../data/bands.js';

// Implement GET Request Method to get all bands and send a JSON response  the route to get all bands is / (meaning it's the root of the /bands endpoint that is set up in /routes/index.js) router.route("/") See lecture code!
const router = Router();

router.get('/', async (req, res) => {
  try {
    const bandList = await getAllBands();
    return res.json(bandList);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Implement GET Request Method to get a band by it's _id and send a JSON response  the route to get a band by the id is /:id (the full path is /bands/:id where :id is the dynamic URL paramater) router.route("/:id") See lecture code!
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!isNaN(id)) {
    return res.status(400).json({ error: 'Bad Request!' });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ObjectId!' });
  }

  try {
    const band = await getBandById(id);
    return res.json(band);
  } catch (e) {
    return res.status(404).json({ error: 'Band Not Found!' });
  }
});

//don't forget to export the router as default!(refer to lecture code)
export default router;
