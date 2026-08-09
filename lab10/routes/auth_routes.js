//import express, express router as shown in lecture code

router.route('/').get(async (req, res) => {
  //code here for GET
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/signin')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router.route('/member').get(async (req, res) => {
  //code here for GET
});

router.route('/manager').get(async (req, res) => {
  //code here for GET
});

router.route('/signout').get(async (req, res) => {
  //code here for GET
});
