const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // Find all categories and include their associated Products
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include its associated Products
    const category = await Category.findByPk(req.params.id, { include: Product });
    if (!category) {
      res.status(404).json({ error: 'Category not found.' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve category.' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create category.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const category = await Category.findByPk(req.params.id);
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update category.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Category not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

module.exports = router;
