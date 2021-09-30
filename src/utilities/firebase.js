import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAb25tglMhET0mCeLO0otJsGgexSaDGT6E",
    authDomain: "cs397-scheduler.firebaseapp.com",
    databaseURL: "https://cs397-scheduler-default-rtdb.firebaseio.com",
    projectId: "cs397-scheduler",
    storageBucket: "cs397-scheduler.appspot.com",
    messagingSenderId: "461734936869",
    appId: "1:461734936869:web:6c4ab2f8c8e1dac9f29acc"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

  export const setData = (path, value) => (
    set(ref(database, path), value)
  );