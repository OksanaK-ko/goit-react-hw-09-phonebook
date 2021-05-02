import React, { Component } from "react";
import { connect } from "react-redux";
import { authOperations } from "../redux/auth";
import { Button } from "react-bootstrap";

const styles = {
  form: {
    width: 320,
    margin: "auto",
  },
  header: {
    textAlign: "center",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
};

class LoginView extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onLogin(this.state);

    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1 style={styles.header}>Страница логина</h1>

        <form
          onSubmit={this.handleSubmit}
          style={styles.form}
          autoComplete="off"
        >
          <label style={styles.label}>
            Почта
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>

          <label style={styles.label}>
            Пароль
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>

          <Button variant="secondary" size="sm" block type="submit">
            Войти
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onLogin: authOperations.logIn,
};

export default connect(null, mapDispatchToProps)(LoginView);
