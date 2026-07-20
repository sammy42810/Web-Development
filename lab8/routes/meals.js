//import express and express router as shown in lecture code and worked in previous labs. Import your data functions from /data/meals.js that you will call in your routes below

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
});

router.route('/searchmealsbykeyword').post(async (req, res) => {
  //code here for POST this is where your form will be submitting keyword and then call your data function passing in the keyword and then rendering the search results of matching meals.
});

router.route('/meal/:id').get(async (req, res) => {
  //code here for GET a single meal
});

//export router
