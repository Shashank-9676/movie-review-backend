import mongoose from 'mongoose';

// Reviews schema with name of user imdbID, rating, and comment
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imdbID: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export const Review = mongoose.model('Review', reviewSchema)