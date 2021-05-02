import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import { CSSTransition } from 'react-transition-group';
import '../../css/animation.css';
import s from './ContactForm.module.css';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    error: false,
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { contacts } = this.props;
    if (
      contacts.find(
        item =>
          item.name.toLowerCase() ===
          e.currentTarget.elements[0].value.toLowerCase(),
      )
    ) {
      this.setState(() => {
        return {
          error: true,
        };
      });

      setTimeout(() => {
        this.setState(() => {
          return {
            error: false,
          };
        });
      }, 1500);
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <div>
        <CSSTransition
          in={this.state.error}
          appear={true}
          classNames="error"
          timeout={250}
          unmountOnExit
        >
          <Alert variant="warning">This contact exists already!</Alert>
        </CSSTransition>
        <form onSubmit={this.handleSubmit}>
          <div className={s.form}>
            <label className={s.label} htmlFor={this.nameInputId}>
              Name
              <input
                className={s.input}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                id={this.nameInputId}
              />
            </label>
            <label className={s.label} htmlFor={this.numberInputId}>
              Number
              <input
                className={s.input}
                type="text"
                name="number"
                value={this.state.number}
                onChange={this.handleChange}
                id={this.numberInputId}
              />
            </label>
            <Button variant="secondary" size="lg" block type="submit">
              Add contact
            </Button>
            {this.props.isLoadingContacts && <h1>Loading...</h1>}
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.defaultProps = {
  type: 'text',
  name: null,
};

ContactForm.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getVisibleContacts(state),
  isLoadingContacts: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(contactsOperations.addContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
