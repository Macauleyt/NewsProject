const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },

  location: {
    type: String,
    required: true
  },

  bio: {
    type: String,
    required: true
  },

  articles: [
    {
      title: {
        type: String,
        required: true
      },
      urlToImage: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
