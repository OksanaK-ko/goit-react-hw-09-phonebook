import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import { Button } from 'react-bootstrap';

const styles = {
  form: {
    width: 320,
    margin: 'auto',
  },
  header: {
    textAlign: 'center',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

// const mapDispatchToProps = {
//   onLogin: authOperations.logIn,
// };

// export default connect(null, mapDispatchToProps)(LoginView);

export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };
  // handleChange = ({ target: { name, value } }) => {
  //   this.setState({ [name]: value });
  // };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    //   this.props.onLogin(this.state);
    setEmail('');
    setPassword('');
    //   this.setState({ name: '', email: '', password: '' });
  };
  return (
    <div>
      <h1 style={styles.header}>Страница логина</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          Почта
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label style={styles.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <Button variant="secondary" size="sm" block type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
}
