const router = require('express').Router();
const { AsyncQueueError } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products 
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err)
  }
});

// GET single category by ID
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({message:'No category was found with that id!'})
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new category via POST request
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      product_id: req.body.product_id,
    });
    res.status(200).json(categoryData)
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (categoryData[0] === 0) {
      // If no rows were affected, it means the category with the given id doesn't exist
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (error) {
    // Handle any errors that occurred during the update process
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the category' });
  }
});
// DELETE category
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(400).json({message: 'No category could be found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  }catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
