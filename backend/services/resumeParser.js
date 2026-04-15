const fs = require("fs")
const pdfParse = require("pdf-parse")
const mammoth = require("mammoth")
const path = require("path")

async function parseResume(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  try {
    if (ext === ".pdf") {
      const buffer = fs.readFileSync(filePath)
      const data = await pdfParse(buffer)
      return data.text
    }
    if (ext === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath })
      return result.value
    }
    throw new Error("Unsupported file format")
  } catch (err) {
    console.error("Parse Error:", err.message)
    throw err
  }
}

module.exports = parseResume