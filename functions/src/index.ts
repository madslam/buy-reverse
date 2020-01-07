import {https} from 'firebase-functions';

import * as admin from 'firebase-admin';

import setupGraphQLServer from './graphql/server';

admin.initializeApp({storageBucket: 'reverse-buy.appspot.com'});

/* CF for Firebase with graphql-server-express */
const graphQLServer = setupGraphQLServer();

// https://us-central1-<project-name>.cloudfunctions.net/api

export const api = https.onRequest(graphQLServer);
/*
export const generateThumbs = storage.object().onFinalize(async object => {
  const bucket = admin.storage().bucket();
  const filePath = object.name;
  //@ts-ignore
  const fileName = filePath.split('/').pop();
  //@ts-ignore
  const bucketDir = dirname(filePath);

  const workingDir = join(tmpdir(), 'thumbs');
  const tmpFilePath = join(workingDir, 'source.png');
  //@ts-ignore
  if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
    console.log('exiting function');
    return false;
  }

  // 1. Ensure thumbnail dir exists
  await fs.ensureDir(workingDir);

  // 2. Download Source File
  //@ts-ignore
  await bucket.file(filePath).download({
    destination: tmpFilePath,
  });

  // 3. Resize the images and define an array of upload promises
  const sizes = [64, 128, 256];

  const uploadPromises = sizes.map(async size => {
    const thumbName = `thumb@${size}_${fileName}`;
    const thumbPath = join(workingDir, thumbName);

    // Resize source image
    await sharp(tmpFilePath).toFile(thumbPath);

    // Upload to GCS
    return bucket.upload(tmpFilePath, {
      destination: join(bucketDir, thumbName),
    });
  });

  // 4. Run the upload operations
  await Promise.all(uploadPromises);

  return fs.remove(workingDir);
});
*/
