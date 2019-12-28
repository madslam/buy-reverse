const getProducts = async (
  _: null | undefined,
  x: null | undefined,
  {db}: any
) => {
  const productsDoc = await db.collection('products').get();
  return productsDoc.docs.map((product: any) => ({
    id: product.id,
    ...product.data(),
  }));
};
const getProduct = async (_: null, {id}: any, {db}: any) => {
  const productDoc = await db
    .collection('products')
    .doc(id)
    .get();
  if (!productDoc.exists) return {id};

  const product = productDoc.data();

  await db
    .collection('products')
    .doc(id)
    .update({view: product.view + 1});

  return {id, ...product};
};
export {getProducts, getProduct};
