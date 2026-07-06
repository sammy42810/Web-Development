//import express and express router as shown in lecture code

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/:equipmentId')
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .patch(async (req, res) => {
    //code here for PUT
  });
