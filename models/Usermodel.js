const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
        min: 6
    }, user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },

},
    { timestamps: true }

)
module.exports = mongoose.model('user', UserSchema)