const express = require('express');
const router = express.Router();

const profileController= require('../controller/profileController')

router.post('/createBusinessCard', profileController.businessCard)
router.get('/getBusinessCard/:cardId',profileController.getBusinessCard)


module.exports = router;