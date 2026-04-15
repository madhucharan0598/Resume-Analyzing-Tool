const token = localStorage.getItem("token")

if (!token) {
  alert("Please login first")
  window.location.href = "login.html"
}

async function loadProfile() {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))

    document.getElementById("userName").innerText = payload.name || "User"
    document.getElementById("userEmail").innerText = payload.email || "No Email"
    document.getElementById("avatar").innerText = payload.name ? payload.name.charAt(0).toUpperCase() : "U"

    const res = await fetch(`${API_URL}/resume`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    if (!data.success || !data.resumes) {
      document.getElementById("totalResumes").innerText = 0
      document.getElementById("avgScore").innerText = "0%"
      document.getElementById("totalSkills").innerText = 0
      return
    }

    const resumes = data.resumes

    document.getElementById("totalResumes").innerText = resumes.length

    let totalScore = 0
    let skillSet = new Set()

    resumes.forEach(r => {
      totalScore += r.score || 0
      if (Array.isArray(r.skills)) {
        r.skills.forEach(s => skillSet.add(s))
      }
    })

    const avg = resumes.length ? (totalScore / resumes.length).toFixed(1) : 0

    document.getElementById("avgScore").innerText = avg + "%"
    document.getElementById("totalSkills").innerText = skillSet.size

  } catch (error) {
    console.error("PROFILE ERROR:", error)
  }
}

loadProfile()

function logout() {
  localStorage.removeItem("token")
  window.location.href = "login.html"
}