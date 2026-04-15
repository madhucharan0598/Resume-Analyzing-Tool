async function loginUser() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const res = await loginUserAPI({ email, password })
  if (res.token) {
    localStorage.setItem("token", res.token)
    alert("Login successful")
    try{
      const resumeRes = await fetch("https://resume-analyzing-tool.onrender.com/api/resume", {
        headers: {
          Authorization: "Bearer " + res.token
        }
      })
      const data = await resumeRes.json()
      console.log("Resume Data:", data)
      if(data.success && data.resumes && data.resumes.length > 0){
        window.location.href = "dashboard.html"
      } else {
        window.location.href = "index.html"
      }

    }catch(error){
      console.error("Error checking resumes:", error)
      window.location.href = "index.html"
    }
  } else {
    alert(res.message)
  }
}

async function signupUser() {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const res = await registerUser({ name, email, password })
  alert(res.message)
  window.location.href = "login.html"
}
