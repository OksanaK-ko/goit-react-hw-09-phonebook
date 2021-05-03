import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import Contacts from '../components/Contacts/Contacts';
import Filter from '../components/Filter/Filter';
import Container from '../components/Container';
import { useDispatch } from 'react-redux';
import { contactsOperations } from '../redux/contacts';
import { CSSTransition } from 'react-transition-group';
import '../css/animation.css';
// import { cleanup } from '@testing-library/react';

const styles = {
  bar: {
    width: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '20 30',
    borderColor: 'rgb(219, 216, 216)',
    boxShadow: '0 4 4 rgba(0, 0, 0, 0.25)',
  },
  title: {
    fontSize: '42',
    fontWeight: '700',
    margin: '0 0 15 0',
    color: '#007bff',
  },
};

export default function ContactsView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <div style={styles.bar}>
        <CSSTransition in={true} appear={true} classNames="fade" timeout={500}>
          <h1 style={styles.title}>Phonebook</h1>
        </CSSTransition>
        <ContactForm />

        <CSSTransition in={true} classNames="fade" timeout={500} unmountOnExit>
          <Filter />
        </CSSTransition>

        <CSSTransition in={true} classNames="fade" timeout={250} unmountOnExit>
          <Contacts />
        </CSSTransition>
      </div>
    </Container>
  );
}
