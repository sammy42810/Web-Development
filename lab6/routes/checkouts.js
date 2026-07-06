//import express and express router as shown in lecture code
// POST /checkouts/checkout/:equipmentId
router
  .route('/checkout/:equipmentId')
  .post(async (req, res) => {
    //code here for POST
   });
//POST /checkouts/checkin/:checkoutId
router
  .route('/checkin/:checkoutId')
  .post(async (req, res) => {
    //code here for POST
   });
//GET /checkouts/overdue
router
  .route('/overdue')
  .get(async (req, res) => {
    //code here for GET
   });
