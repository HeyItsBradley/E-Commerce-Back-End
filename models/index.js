// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "id",
  hooks: true,
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "id",
  onDelete: "CASCADE",
  hooks: true,
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  onDelete: "CASCADE",
  hooks: true,
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  onDelete: "CASCADE",
  hooks: true,
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
