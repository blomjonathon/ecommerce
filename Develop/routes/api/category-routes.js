
// import needed files
const router = require('express').Router();
const { Category, Product } = require('../../models');


// create routes for api 
router.get('/', async (req, res) => {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
});

// get route
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: Product });
    if (!category) {
      res.json({ error: 'category unavailable' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.json({ error: 'fail' });
  }
});

// post route
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    console.error(error);
    res.json({ error: 'fail' });
  }
});

// put route
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const category = await Category.findByPk(req.params.id);
      res.json(category);
    }
  } catch (error) {
    res.json({ error: 'fail' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.end();
    } 
  } catch (error) {
    res.json({ error: 'fail' });
  }
});

module.exports = router;
