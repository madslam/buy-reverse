import {https} from 'firebase-functions';

import * as admin from 'firebase-admin';

import setupGraphQLServer from './graphql/server';

admin.initializeApp();

/* CF for Firebase with graphql-server-express */
const graphQLServer = setupGraphQLServer();

// https://us-central1-<project-name>.cloudfunctions.net/api

export const api = https.onRequest(graphQLServer);

/*
export const generateThumbs = storage.object().onFinalize(async object => {
  const bucket = admin.storage().bucket(object.bucket);
  const filePath = object.name;
  if (filePath) {
    const fileName = filePath.split('/').pop();
    const bucketDir = dirname(filePath);
    const workingDir = join(tmpdir(), 'thumbs');
    const tmpFilePath = join(workingDir, 'source.png');

    if (
      (fileName && fileName.includes('thumb@')) ||
      (object.contentType && !object.contentType.includes('image'))
    ) {
      return false;
    }
    await fs.ensureDir(workingDir);

    await bucket.file(filePath).download({
      destination: tmpFilePath,
    });

    const thumbName = fileName || '';
    const thumbPath = join(workingDir, thumbName);
    await sharp(tmpFilePath)
      .resize(400, 400)
      .toFile(thumbPath);

    bucket.upload(thumbPath, {
      destination: join(bucketDir, thumbName),
    });

    return fs.remove(workingDir);
  }
});
*/
