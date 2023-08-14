/*
    1.  Let's import the easyinvoice library so we can use it.
    2.  Let's import the built-in NodeJS fs library,
        so we can interact with the file system to save our invoice 
*/
var easyinvoice = require("easyinvoice");
var fs = require("fs");
const { Order } = require("../models/Order");
const { FabricRoll } = require("../models/FabricRoll");

//  4.    Let's use the EasyInvoice library and call the "createInvoice" function
const exportBill = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.body.orderId }).populate({
      path: "products",
      populate: [
        {
          path: "fabricID",
        },
      ],
    });

    var data = {
      client: {
        company: order.receiverName,
        address: order.receiverAddress,
        zip: "70000",
        city: "Ho Chi Minh City",
        country: "VietNam",
      },

      sender: {
        company: "FabricVN Corp",
        address: "Thu Duc District",
        zip: "70000",
        city: "Ho Chi Minh City",
        country: "VietNam",
      },

      images: {
        logo: "https://logowik.com/content/uploads/images/fabric6240.jpg",
      },

      information: {
        // Invoice number
        number: order._id,
        // Invoice data
        date: order.orderTime,
        // Invoice due date
        "due-date": "28-07-2023",
      },
      products: order?.products?.map((ele) => {
        return {
          quantity: ele.quantity,
          description: ele?.fabricID?.name,
          "tax-rate": 0,
          price: 100000,
        };
      }),
      bottomNotice: "Kindly pay your invoice within 15 days.",

      // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
      settings: {
        currency: "VND", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        translate: {},

        customize: {},
      },
    };
    const result = await easyinvoice.createInvoice(data);
    res.json({ status: 200, message: "Success!", data: result.pdf });
  } catch (error) {
    console.log(error);
    res.json({ status: 400, message: "Error creating invoice" });
  }
};

module.exports = { exportBill };
