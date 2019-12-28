import React from 'react';
import {SnackbarProvider} from 'notistack';
import * as firebase from 'firebase/app';
import './App.css';

import NavBar from './component/NavBar';
import Router from './Router';
import firebaseConfig from './firebase-config';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function App() {
  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NavBar />

        <Router />
      </SnackbarProvider>
    </div>
  );
}

export default App;
