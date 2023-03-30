import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './components/Form/ContactsForm';
import { ContactList } from './components/List/ContactsList';
import { Filter } from './components/Filter/Filter';
import {
  ContactsTitle,
  PhonebookTitle,
  Wrapper,
} from './components/App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    console.log(data);
    const newContact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };

    if (
      this.state.contacts.filter(contact => data.name === contact.name).length
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContsct = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Wrapper>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter
          filter={this.state.filter}
          onChange={this.changeFilter}
        ></Filter>
        <ContactList
          contacts={visibleContacts}
          onDelete={this.deleteContsct}
        ></ContactList>
      </Wrapper>
    );
  }
}
