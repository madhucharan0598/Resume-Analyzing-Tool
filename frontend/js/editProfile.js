const token = localStorage.getItem("token")

if (!token) {
  alert("Please login first")
  window.location.href = "login.html"
}

function loadUserData() {
  const payload = JSON.parse(atob(token.split(".")[1]))

  document.getElementById("name").value = payload.name || ""
  document.getElementById("email").value = payload.email || ""
  document.getElementById("avatar").innerText = payload.name ? payload.name[0].toUpperCase() : "U"
}

function updateProfile(e) {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const bio = document.getElementById("bio").value
  const skills = document.getElementById("skills").value

  const updatedData = {
    name,
    email,
    bio,
    skills: skills.split(",").map(s => s.trim())
  }

  console.log("Updated Profile:", updatedData)

  alert("Profile updated (frontend only for now)")

  window.location.href = "profile.html"
}

function logout() {
  localStorage.removeItem("token")
  window.location.href = "login.html"
}

loadUserData()