import firebase from 'firebase';

export const getImage = async images => {
  const imgsUrl = [];

  for (const nameImg of images) {
    let imgUrl = await firebase
      .storage()
      .ref(nameImg)
      .getDownloadURL();
    imgsUrl.push(imgUrl);
  }

  return imgsUrl;
};
