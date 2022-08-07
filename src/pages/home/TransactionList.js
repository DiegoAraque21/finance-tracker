import { useFirestore } from '../../hooks/useFirestore';
import TrashIcon from '../../assets/delete-icon.svg';

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions');
  return (
    <div
      className="rounded overflow-auto mt-5 bg-success"
      style={{ maxHeight: '28.7rem' }}
    >
      {transactions.map((transaction) => {
        let date = transaction.createdAt.toDate().toString();
        date = date.split(':')[0];
        date = date.slice(0, -3);
        return (
          <div
            className="card text-bg-light mb-3 mt-5 mx-auto"
            style={{ maxWidth: '20rem' }}
            key={transaction.id}
          >
            <div className="card-header text-dark">
              {transaction.name}, {date}
            </div>
            <div className="card-body">
              <h5 className="card-title text-dark">${transaction.amount}</h5>
              <p className="card-text text-dark">{transaction.description}</p>
              <img
                src={TrashIcon}
                alt="trash-icon"
                style={{
                  width: '30px',
                  height: '30px',
                }}
                onClick={() => deleteDocument(transaction.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
