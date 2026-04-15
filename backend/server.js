const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const resumeRoutes = require("./routes/resumeRoutes")

const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/resume", resumeRoutes)
app.get("/", (req, res) => {
  res.send("API Running")
})
const PORT = process.env.PORT || 5000
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({
    message: err.message || "Server Error"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})