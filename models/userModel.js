const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please, Add the Username"]
    },
    email: {
        type: String,
        required: [true,"Please, Add the contact email adress"],
        unique: [true,"email already taken"]
    },
    password: {
        type: String,
        required: [true,"Please, user passsword"]
    }

},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User",userSchema)