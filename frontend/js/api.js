const API_URL = "https://resume-analyzing-tool.onrender.com/api"

async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

async function loginUserAPI(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

async function getResumesAPI() {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/resume`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}

async function uploadResumeAPI(file) {
  const formData = new FormData()
  formData.append("resume", file)
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/resume`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  return res.json()
}

function logout(){
  localStorage.removeItem("token")
  window.location.href = "login.html"
}
