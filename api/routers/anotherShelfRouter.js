const anotherShelfRouter = require('express').Router();

anotherShelfRouter.get('/:userId', async (req, res) => {
  return res.status(200).send({});
});

module.exports = anotherShelfRouter;
