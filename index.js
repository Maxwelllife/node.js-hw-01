const contactsOperations = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone,
        id
      );
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);

      break;

    case "update":
      const updateContact = await contactsOperations.updateContact(
        name,
        email,
        phone,
        id
      );
      console.log(updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);

// id = "11";
// const newData = {
//   name: "Adam Kon",
//   email: "AdamIgogo.elementum@sdui.net",
//   phone: "(658) 244-2568",
// };
// // invokeAction({ action: "get", id });
// invokeAction({ action: "add", id, data: newData });
