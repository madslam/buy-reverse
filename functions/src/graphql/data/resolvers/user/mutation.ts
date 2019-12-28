const createUser = async (_: null, {user}: any, {db}: any) => {
  const newUser = await db
    .collection('users')
    .doc(user.id)
    .set({
      ...user,
      favProduct: [],
      listProduct: [],
    });

  return {id: newUser.id, ...user};
};

const addFav = async (_: null, {user, product}: any, {db}: any) => {
  await db
    .collection('users')
    .doc(user.id)
    .update({
      favProduct: [...user.favProduct, product.id],
    });
  await db
    .collection('products')
    .doc(product.id)
    .update({fav: product.fav + 1});

  return {...user};
};
const removeFav = async (_: null, {user, product}: any, {db}: any) => {
  const filteredFav = user.favProduct.filter(
    (productId: any) => productId !== product.id
  );

  await db
    .collection('users')
    .doc(user.id)
    .update({
      favProduct: filteredFav,
    });
  await db
    .collection('products')
    .doc(product.id)
    .update({fav: product.fav - 1});
  return {...user};
};
export {createUser, addFav, removeFav};
