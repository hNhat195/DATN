const { Warehouse } = require("../models/Warehouse");
const mongoose = require('mongoose')

const getAllWarehouse = async (req, res) => {
    try {
        const responseData = await Warehouse.find();
        res.status(200).json(responseData)
    }
    catch(e) {
        res.status(505).json([])
    }   
}

module.exports = {
    getAllWarehouse
}