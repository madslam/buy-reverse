export default {
  User: {
    productsfav: (user: any, x: null | undefined, {db}: any) =>
      user.favProductsId.map(async (productId: any) => {
        const productDoc = await db
          .collection('products')
          .doc(productId)
          .get();
        return {id: productDoc.id, ...productDoc.data()};
      }),
    productsUser: (user: any, x: null | undefined, {db}: any) =>
      user.userProductsId.map(async (productId: any) => {
        const productDoc = await db
          .collection('products')
          .doc(productId)
          .get();
        return {id: productDoc.id, ...productDoc.data()};
      }),
  },
};
