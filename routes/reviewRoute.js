import { Router } from "express";
import { getReviews,addReview } from "../controllers/reviewController.js";
import { authenticate } from "../middleware.js";
const reviewRoute = Router();

reviewRoute.get('/:id/reviews',authenticate, getReviews)
reviewRoute.post('/:id/reviews',authenticate, addReview)
export default reviewRoute