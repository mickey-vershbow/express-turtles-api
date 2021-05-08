const { Schema, model } = require('mongoose');

const TurtleSchema = new Schema ({
    name: String,
    role: String
});

const Turtle = model("Turtle", TurtleSchema);

module.exports = Turtle;
