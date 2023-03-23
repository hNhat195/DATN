const mongoose = require("mongoose");
const { Schema } = mongoose;
const CounterSchema = new Schema(
    {
        counter_type: {
            type: String,
            required: true
        },
        sequence_value: {
            type: Number,
            required: true
        }
    },
    { collection: "Counter" }
);
const Counter = mongoose.model("Counter", CounterSchema);
module.exports = { Counter };