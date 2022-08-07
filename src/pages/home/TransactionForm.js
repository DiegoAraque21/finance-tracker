import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      description,
      amount,
    });
  };

  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
      setDescription('');
    }
  }, [response.success]);

  return (
    <div className="container mt-5 bg-success rounded pb-5">
      <form onSubmit={handleSubmit}>
        <h2 className={`text-dark text-center pt-5`}>Add transaction</h2>

        <div className="col-md-6 mx-auto">
          <label htmlFor="transactionName" className="form-label text-dark">
            Transaction Name
          </label>
          <input
            type="text"
            className="form-control"
            name="transactionName"
            id="transactionName"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="col-md-6 mx-auto">
          <label htmlFor="description" className="form-label text-dark mt-2">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="col-md-6 mx-auto">
          <label htmlFor="amount" className="form-label text-dark mt-2">
            Amount ($)
          </label>
          <input
            type="number"
            className="form-control"
            name="amount"
            id="amount"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>
        <div className="col-md-6 mx-auto mt-3">
          <button className="btn btn-success text-dark border border-light">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
