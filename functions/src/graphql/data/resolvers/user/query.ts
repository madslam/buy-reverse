import {ValidationError} from 'apollo-server-express';

const getUser = async (_: null, {id}: any, {db}: any) => {
  const userDoc = await db
    .collection('users')
    .doc(id)
    .get();
  if (!userDoc.exists) return new ValidationError('pas de user');

  return {id, ...userDoc.data()};
};

export {getUser};
