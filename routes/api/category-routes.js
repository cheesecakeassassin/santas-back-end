const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // Find all categories
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                attributes: ['product_name'],
            },
        ],
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    // Find one category by its `id` value
    Category.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                attributes: ['product_name'],
            },
        ],
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category with this id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // Create a new category
    Category.create({
        category_name: req.body.category_name,
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // Update a category by its `id` value
    Category.update(
        {
            category_name: req.body.category_name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category with this id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // Delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category with this id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
