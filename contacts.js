const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
    try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return console.table(JSON.parse(data))
    }
    catch (err) {
    console.error(err)}
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8')
        const contact = JSON.parse(data).find(el => el.id === contactId)
        console.log(contact)
    }
    catch (err) {
    console.error(err)}
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8')
        const newContacts = JSON.parse(data).filter(el => el.id !== contactId)

        await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8')

        console.table(newContacts)
    }
    catch (err) {
    console.error(err)}
}

async function addContact(name, email, phone) {
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone
    };

    try {
        const data = await fs.readFile(contactsPath, 'utf8')
        .then(data => JSON.parse(data))        

        data.push(newContact);        

        await fs.writeFile(contactsPath, JSON.stringify(data), 'utf8')

        console.table(data)
    }
    catch (err) {
    console.error(err)}
}

module.exports = {listContacts, getContactById, removeContact, addContact}