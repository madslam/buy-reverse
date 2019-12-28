const createProduct = async (_: null, {product}: any, {db}: any) => {
  const newProduct = await db.collection('products').add({
    ...product,
    priceCurrent: product.priceMax,
    avalaible: true,
    view: 0,
    fav: 0,
  });

  return {id: newProduct.id, ...product};
};

export {createProduct};
