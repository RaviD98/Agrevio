const getProductById = async (productId) => {
  return Product.findById(productId);
};