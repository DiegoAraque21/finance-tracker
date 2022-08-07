import { useReducer, useEffect, useState } from 'react';

import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { document: null, error: null, success: false, isPending: true };
    case 'ADD_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    case 'DELETED_DOCUMENT':
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addDoc = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: addDoc });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'error', payload: err.message });
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    } catch (err) {
      console.log(err);
      dispatchIfNotCancelled({ type: 'error', payload: 'could not delete' });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    response,
  };
};
