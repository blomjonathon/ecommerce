const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.json(tags);
  } catch (err) {
    res.json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!tag) {
      res.json({ message: 'Tag does not appear to be viable' });
    }
    res.json(tag);
  } catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTag = await Tag.findByPk(req.params.id);
      res.json(updatedTag);
    } else {
      res.json({ message: 'tag not found by id' });
    }
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deletedTag) {
      res.json({ message: 'tag not found' });
      return;
    }
    res.json({ message: 'deleted' });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
