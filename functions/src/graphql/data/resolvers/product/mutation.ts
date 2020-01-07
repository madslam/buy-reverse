import {ValidationError} from 'apollo-server-express';
import * as admin from 'firebase-admin';

const createProduct = async (_: null, {product, userId}: any, {db}: any) => {
  const userDoc = await db
    .collection('users')
    .doc(userId)
    .get();

  if (!userDoc.exists) return new ValidationError("l'utilisateur n'existe pas");
  const newProduct = await db.collection('products').add({
    ...product,
    priceCurrent: product.priceMax,
    avalaible: true,
    sellerId: userId,
    view: 0,
    fav: 0,
  });
  await db
    .collection('users')
    .doc(userId)
    .update({
      userProductsId: [...userDoc.data().userProductsId, newProduct.id],
    });
  return {id: newProduct.id, ...product};
};

const modifyProduct = async (_: null, {product, userId}: any, {db}: any) => {
  const userDoc = await db
    .collection('users')
    .doc(userId)
    .get();

  const productDoc = await db
    .collection('products')
    .doc(product.id)
    .get();
  if (!userDoc.exists) return new ValidationError("l'utilisateur n'existe pas");
  if (!productDoc.exists) return new ValidationError("le produit n'existe pas");

  const {userProductsId} = userDoc.data();
  const {images: oldImages} = productDoc.data();

  const isProductUser = userProductsId.find((p: string) => p === product.id);
  if (!isProductUser) {
    return new ValidationError("le produit n'appartient pas à l'utilisateur");
  }
  const {
    id,
    title,
    description,
    priceMax,
    priceMin,
    sellingTime,
    images,
  } = product;
  const updatedProduct = db
    .collection('products')
    .doc(id)
    .update({
      title,
      description,
      priceMax,
      priceMin,
      sellingTime,
      images,
    });
  const bucket = admin.storage().bucket();

  oldImages.forEach(async (img: any) => {
    if (!images.includes(img)) {
      await bucket.file(img).delete();
    }
  });
  return {id: updatedProduct.id, ...product};
};

const removeProduct = async (_: null, {product, userId}: any, {db}: any) => {
  const userDoc = await db
    .collection('users')
    .doc(userId)
    .get();

  if (!userDoc.exists) {
    return new ValidationError("l'utilisateur n'existe pas");
  }
  const userData = userDoc.data();

  const {userProductsId} = userData;

  const isProductUser = userProductsId.find((p: string) => p === product.id);

  if (!isProductUser) {
    return new ValidationError("le produit n'appartient pas à l'utilisateur");
  }

  const filterUserProduct = userProductsId.filter(
    (p: string) => p !== product.id
  );

  const favProductsUser = await db
    .collection(`products`)
    .where('favProductsId', 'array-contains', product.id)
    .get();

  favProductsUser.forEach((userFavDoc: any) => {
    const userFavData = userFavDoc.data();
    const filterProduct = userFavData.favProductsId.filter(
      (productId: string) => productId !== product.id
    );
    db.collection('users')
      .doc(userFavDoc.id)
      .update({
        ...userFavData,
        favProductsId: filterProduct,
      });
  });

  await db
    .collection('users')
    .doc(userId)
    .update({userProductsId: filterUserProduct});

  await db
    .collection('products')
    .doc(product.id)
    .delete();

  const bucket = admin.storage().bucket();

  product.images.forEach(async (filename: string) => {
    await bucket.file(filename).delete();
  });

  return {...product};
};
export {createProduct, modifyProduct, removeProduct};
