// require the express library
const express = require('express')
const passport = require('passport')
// create a router so our code is more modular
const router = express.Router()
// require review model
const Review = require('./../models/review')
// require the handle404 middleware, to handle not finding documents
const handle404 = require('../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', { session: false })
// CREATE
// POST /reviews/
router.post('/reviews', requireToken, (req, res, next) => {
  // set owner of new review to be current user
  const reviewData = req.body.review
  reviewData.owner = req.user.id

  Review.create(reviewData)
    // respond to succesful `create` with status 201 and JSON of new "review"
    .then(review => {
      res.status(201).json({ review: review.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})
// router.get('/reviews', requireToken, (req, res, next) => {
//   // Create a review using the reviewData
//   Review.find({ owner: req.user._id})
//     // respond with the status code 201 created and the review that was created
//     .then(reviews => res.status(201).json({ reviews: reviews }))
//     // if an error occurs, call the next middleware (the error handler middleware)
//     .catch(next)
// })
// INDEX
// GET /Reviews
router.get('/reviews', requireToken, (req, res, next) => {

  Review.find({ owner: req.user._id })
    .then(reviews => res.json({
      reviews: reviews
    }))
    .catch(next)
})
router.get('/reviews/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  // Create a review using the reviewData
  // Review.findById(id)
  Review.findOne({ _id: id, owner: req.user._id})
    .then(handle404)
    // respond with the status code 201 created and the review that was created
    .then(review => res.status(200).json({ review: review }))
    // if an error occurs, call the next middleware (the error handler middleware)
    .catch(next)
})
// UPDATE
// PATCH /reviews/5a7db6c74d55bc51bdf39793
router.patch('/reviews/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.review.owner
  Review.findOne({
    _id: id,
    owner: req.user._id
  })
  // Review.findOneAndUpdate({ _id: id, owner: req.user._id }, req.body.review)
    .then(handle404)
    .then(review => review.updateOne(req.body.review))
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /reviews/:id
router.delete('/reviews/:id', requireToken, (req, res, next) =>{
  const id = req.params.id
  Review.findOne({
    _id: id,
    owner: req.user._id
  })
    .then(handle404)
    .then(review => review.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
