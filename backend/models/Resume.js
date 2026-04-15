const mongoose = require("mongoose")
const resumeSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  fileName: String,
  content: String,
  skills: [String],
  score: Number,
  jobRoles: [String],
  suggestions: [String]
}, { timestamps: true })

module.exports = mongoose.model("Resume", resumeSchema)