const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    task: [
        {
            text: {
                type: String
            },
            key: {
                type: String
            },
            isActive: {
                type: Boolean
            }
        }
    ]
    ,

},
    { timestamps: true }
)
module.exports = mongoose.model('task', TaskSchema)