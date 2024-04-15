const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Findian-sweet&psig=AOvVaw0VLD73wDqCBwMm6vf3XM21&ust=1713079515142000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIikxdHUvoUDFQAAAAAdAAAAABAE",
    set: (v) =>
      v === ""
        ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Findian-sweet&psig=AOvVaw0VLD73wDqCBwMm6vf3XM21&ust=1713079515142000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIikxdHUvoUDFQAAAAAdAAAAABAE"
        : v,
  },
  price: Number,
  category: String,
  flavor: String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner : {
    type : Schema.Types.ObjectId, 
    ref : "User",
  }

});

listingSchema.post("findOneAndDelete" , async (listing) => {
  if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews}});
  }
 
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
