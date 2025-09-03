import { Review } from "../model/reviews.js";
export const getReviews = async (req, res) => {
    const {id} = req.params
    try {
        let response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=89882e4e`)
        response = await response.json()
        if(response.Response == "True") {
          const reviews = await Review.find({imdbID:id});
          res.status(200).json({movieDetails:response,reviews});
        } else {
          res.status(404).json({message:"Movie not found"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addReview = async (req, res) => {
    const {id} = req.params
    const { rating, comment } = req.body;
    const review = new Review({ name:req.user.name, imdbID:id, rating, comment });
    try {
        await review.save();
        res.status(200).json({message:"Review Added Successfully",review});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}