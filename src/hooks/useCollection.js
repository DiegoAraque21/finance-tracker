import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }
    setIsPending(true);
    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
        setIsPending(false);
      },
      (err) => {
        console.log(err);
        setError('Could not fetch the data');
        setIsPending(false);
      }
    );

    // unsubscribe on unmount of the component
    return () => unsub();
  }, [collection, query, orderBy]);

  return {
    documents,
    error,
    isPending,
  };
};
