/*
    1.  Let's import the easyinvoice library so we can use it.
    2.  Let's import the built-in NodeJS fs library,
        so we can interact with the file system to save our invoice 
*/
var easyinvoice = require("easyinvoice");
var fs = require("fs");

/*  
    3.  Let's create a data object. 
        This object will contain all the data we would like to be visible on our invoice.
        We will add data later in our demo.
*/
var data = {
  client: {
    company: "Client Corp",
    address: "Clientstreet 456",
    zip: "4567 CD",
    city: "Clientcity",
    country: "Clientcountry",
  },

  sender: {
    company: "Sample Corp",
    address: "Sample Street 123",
    zip: "1234 AB",
    city: "Sampletown",
    country: "Samplecountry",
  },

  images: {
    logo: "https://logowik.com/content/uploads/images/fabric6240.jpg",
  },

  information: {
    // Invoice number
    number: "2021.0001",
    // Invoice data
    date: "12-12-2021",
    // Invoice due date
    "due-date": "31-12-2021",
  },

  // Now let's add some products! Calculations will be done automatically for you.
  products: [
    {
      quantity: "2",
      description: "Test1",
      "tax-rate": 6,
      price: 33.87,
    },
    {
      quantity: "4",
      description: "Test2",
      "tax-rate": 21,
      price: 10.45,
    },
  ],

  // We will use bottomNotice to add a message of choice to the bottom of our invoice
  bottomNotice: "Kindly pay your invoice within 15 days.",

  // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
  settings: {
    currency: "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
    translate: {},

    customize: {},
  },
};

//  4.    Let's use the EasyInvoice library and call the "createInvoice" function
const exportBill = async (req, res) => {
  console.log(req.body);
  const result = await easyinvoice.createInvoice(req.body);

  await fs.writeFileSync("invoice.pdf", result.pdf, "base64");
  // await easyinvoice.download("myInvoice.pdf", result.pdf);
};

module.exports = { exportBill };
