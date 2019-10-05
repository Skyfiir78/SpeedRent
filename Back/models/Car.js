const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema ({
    marque: String,
    model: String,
    immat: String,
    localisation: {
        latitude: String,
        longitude: String,
    },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    available: Boolean
})

mongoose.model('Car', CarSchema);
