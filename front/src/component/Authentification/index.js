// Import FirebaseAuth and firebase.
import {useDispatch} from 'react-redux';
import {useMutation} from 'react-apollo';
import firebase from 'firebase';
import React, {useState, useEffect, useCallback} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {CREATE_USER} from '../../apollo/query/user';
import {LOGIN_SUCCESS} from './../../redux/user';

const SignInScreen = () => {
  const [isSignedIn, setSigned] = useState(false);
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const loginSuccess = useCallback(props => dispatch(LOGIN_SUCCESS({})));
  const [createUser, {loading}] = useMutation(CREATE_USER, {
    variables: {user},
    onCompleted: data => {
      console.log('user ajouté avec succés !', {
        variant: 'success',
      });
    },
    onError: error => {
      console.log(`erreur lors de l'ajout d'un user : ${error}`, {
        variant: 'error',
      });
    },
  });

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: userConnected => {
        const {uid} = userConnected.user;
        if (userConnected.additionalUserInfo.isNewUser) {
          setUser({id: uid});
          createUser();
        }

        loginSuccess();
      },
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setSigned(!!user);
    });
  }, []);

  return !isSignedIn ? (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  ) : (
    <div>
      <h1>Reverse Buy</h1>
      <p>
        Bienvenue {firebase.auth().currentUser.displayName}! tu es à présent
        connecté
      </p>
    </div>
  );
};

export default SignInScreen;
