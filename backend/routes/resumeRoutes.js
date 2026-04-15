const express = require("express")
const router = express.Router()
const upload = require("../services/multerConfig")
const auth = require("../middleware/authMiddleware")

const {
  uploadResume,
  getResumes
} = require("../controllers/resumeController")
router.post("/", auth, upload.single("resume"), uploadResume)
router.get("/", auth, getResumes)

module.exports = router