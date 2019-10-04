const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema ({
    marque: String,
    model: String,
    immat: String,
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

mongoose.model('Car', CarSchema);
