import React from 'react';
import ContactList from '../components/Contact/ContactList';
import Header from '../components/Header';

const ContactPage = () => (
  <div className="min-h-full bg-gradient-to-br from-blue-50 to-white">
    <Header />
    <ContactList />
  </div>
);

export default ContactPage;


