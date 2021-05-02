import { useState } from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  },
};

export default function RegisterView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
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
  // const handleNameChange = event => {
  //   setName(event.target.value);
  // };

  // const handleEmailChange = event => {
  //   setEmail(event.target.value);
  // };

  // const handlePassswordChange = event => {
  //   setPassword(event.target.value);
  // };

  return (
    <div>
      <h1 style={styles.header}>Страница регистрации</h1>

      <form style={styles.form} autoComplete="off">
        <label style={styles.label}>
          Имя
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
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
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
}

// class OldRegisterView extends Component {
//   state = {
//     name: '',
//     email: '',
//     password: '',
//   };

// handleChange = ({ target: { name, value } }) => {
//   this.setState({ [name]: value });
// };

// handleSubmit = e => {
//   e.preventDefault();

//   this.props.onRegister(this.state);

//   this.setState({ name: '', email: '', password: '' });
// };

//   render() {
//     const { name, email, password } = this.state;

//     return (
//       <div>
//         <h1 style={styles.header}>Страница регистрации</h1>

//         <form
//           onSubmit={this.handleSubmit}
//           style={styles.form}
//           autoComplete="off"
//         >
//           <label style={styles.label}>
//             Имя
//             <input
//               type="text"
//               name="name"
//               value={name}
//               onChange={this.handleChange}
//             />
//           </label>

//           <label style={styles.label}>
//             Почта
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={this.handleChange}
//             />
//           </label>

//           <label style={styles.label}>
//             Пароль
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={this.handleChange}
//             />
//           </label>

//           <Button variant="secondary" size="sm" block type="submit">
//             Зарегистрироваться
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = {
//   onRegister: authOperations.register,
// };

// export default connect(null, mapDispatchToProps)(RegisterView);
