import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import { CSSTransition } from 'react-transition-group';
import '../../css/animation.css';
import s from './ContactForm.module.css';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(false);
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const isLoadingContacts = useSelector(contactsSelectors.getLoading);
  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };
  const handleNumberChange = e => {
    setNumber(e.currentTarget.value);
  };

  const onSubmit = (name, number) =>
    dispatch(contactsOperations.addContact({ name, number }));

  const handleSubmit = e => {
    e.preventDefault();
    if (
      contacts.find(
        item =>
          item.name.toLowerCase() ===
          e.currentTarget.elements[0].value.toLowerCase(),
      )
    ) {
      setError(true);

      return setTimeout(() => {
        setError(false);
      }, 1500);
    }

    onSubmit(name, number);
    setName('');
    setNumber('');
  };
  return (
    <div>
      <CSSTransition
        in={error}
        appear={true}
        classNames="error"
        timeout={250}
        unmountOnExit
      >
        <Alert variant="warning">This contact exists already!</Alert>
      </CSSTransition>
      <form onSubmit={handleSubmit}>
        <div className={s.form}>
          <label className={s.label}>
            Name
            <input
              className={s.input}
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label className={s.label}>
            Number
            <input
              className={s.input}
              type="text"
              name="number"
              value={number}
              onChange={handleNumberChange}
            />
          </label>
          <Button variant="secondary" size="lg" block type="submit">
            Add contact
          </Button>
          {isLoadingContacts && <h1>Loading...</h1>}
        </div>
      </form>
    </div>
  );
}

ContactForm.defaultProps = {
  type: 'text',
  name: null,
};

ContactForm.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};
