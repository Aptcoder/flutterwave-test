const express = require('express');
const { requestValidator } = require('../middlewares/validator');
const { validate } = require('../controllers/validate-rule');

const router = express.Router();

router.get('/', (req, res) => res.send({
  message: 'My Rule-validation API',
  status: 'success',
  data: {
    name: 'Samuel Omilo',
    github: '@Aptcoder',
    email: 'omilosamuel@gmail.com',
    mobile: '08153632823'
  }
}));

router.post('/validate-rule', requestValidator, validate);

module.exports = router;
