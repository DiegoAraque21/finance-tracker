import TransactionForm from './TransactionForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import TransactionList from './TransactionList';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          {isPending && (
            <div className="alert alert-info mt-5" role="alert">
              Loading...
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-5" role="alert">
              {error}
            </div>
          )}
          {documents && <TransactionList transactions={documents} />}
        </div>
        <div className="col">
          <TransactionForm uid={user.uid} />
        </div>
      </div>
    </div>
  );
}
