const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    
    Name: {
      type: String,
      trim: true,
      required: true,
    },
    Designation: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    contactNumber: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
    },
    emailId: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    websiteURL: {
      type: String,
      trim: true,
      required: true,
    },
    socialURLs: {
      type: [{type:String}, {type:String}, {type:String}],
      required: true
    },
    companyLogo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("businessCard", profileSchema);
