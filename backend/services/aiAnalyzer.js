function analyzeResume(text) {
  text = text.toLowerCase()
  const skillsDB = [
    "javascript","react","node","express","mongodb",
    "python","java","c++","sql","aws","docker",
    "machine learning","data science","html","css"
  ]
  const skills = skillsDB.filter(skill => text.includes(skill))
  let jobRoles = []

  if (skills.includes("react") || skills.includes("javascript")) {
    jobRoles.push("Frontend Developer")
  }

  if (skills.includes("node") || skills.includes("express")) {
    jobRoles.push("Backend Developer")
  }

  if (skills.includes("mongodb") && skills.includes("node")) {
    jobRoles.push("Full Stack Developer")
  }

  if (skills.includes("python") && skills.includes("machine learning")) {
    jobRoles.push("ML Engineer")
  }

  let score = Math.min(100, skills.length * 10)
  let suggestions = []
  
  if (!skills.includes("projects")) {
    suggestions.push("Add project experience")
  }

  if (!skills.includes("github")) {
    suggestions.push("Include GitHub profile")
  }

  if (skills.length < 5) {
    suggestions.push("Add more technical skills")
  }

  if (!text.includes("experience")) {
    suggestions.push("Mention work experience clearly")
  }

  return {
    skills,
    jobRoles,
    score,
    suggestions
  }
}

module.exports = analyzeResume