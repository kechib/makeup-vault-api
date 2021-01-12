const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
  required: true
},
recommend:{
  type: String,
required: true
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)
