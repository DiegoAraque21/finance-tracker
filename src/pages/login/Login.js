// hooks
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
//styles
import styles from './Login.module.css';

export default function Login() {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.container}>
      <form className={styles.inner_container} onSubmit={handleSubmit}>
        <h2 className={`text-dark text-center ${styles.h2}`}>Log In</h2>

        <div className="col-md-12">
          <label htmlFor="email" className="form-label text-dark">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="password" className="form-label text-dark mt-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {!isPending && (
          <div className="col-md-12 mt-5">
            <button className="btn btn-success w-100">Log In</button>
          </div>
        )}
        {isPending && (
          <div className="alert alert-info mt-3" role="alert">
            Loading...
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
