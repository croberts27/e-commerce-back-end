// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Product, {
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsTo(ProductTag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
});


// Tags belongToMany Products (through ProductTag)
Tag.belongsTo(ProductTag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
