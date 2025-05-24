const mongoose = require('mongoose');
const BuzzSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    }     
});

module.exports = mongoose.model('Buzz', BuzzSchema);