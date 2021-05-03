import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import s from './Contacts.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from 'react-bootstrap';

export default function Contacts() {
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const dispatch = useDispatch();
  const onDelete = useCallback(
    id => {
      dispatch(contactsOperations.deleteContact(id));
    },
    [dispatch],
  );

  return (
    <TransitionGroup component="ul" className={s.ContactList}>
      {contacts.map(({ id, name, number }) => (
        <CSSTransition key={id} timeout={250} classNames={s}>
          <li className={s.ContactList_item}>
            {name}: {number}
            <Button variant="danger" size="sm" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onDeleteContact: PropTypes.func,
};
