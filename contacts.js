const fs = require("fs/promises");
const path = require("path");

// const contactsPath = path.resolve("db/contacts.json");
const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log("contactsPath: ", contactsPath);

async function listContacts() {
  const list = await fs.readFile(contactsPath);

  const contacts = JSON.parse(list);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (contact === -1) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact(name, email, phone, id) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
async function updateContact(name, email, phone, id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { name, email, phone, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
}

contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = contactsOperations;
