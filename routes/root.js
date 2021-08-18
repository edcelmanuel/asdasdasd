const express = require('express'); 
const router  = express.Router(); 
const rootCtrl = require("../controller/root")

router.post('/login/', rootCtrl.login); 
router.post('/authcheck/', rootCtrl.authCheck); 

module.exports = router;