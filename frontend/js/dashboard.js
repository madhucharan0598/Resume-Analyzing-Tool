const token = localStorage.getItem("token")

if (!token) {
  alert("Please login first")
  window.location.href = "login.html"
}

async function loadDashboard() {
  try {
    const data = await getResumesAPI()

    if (!data.success) {
      alert("Error from server")
      return
    }

    const resumes = data.resumes

    if (!resumes || resumes.length === 0) {
      alert("No resumes found")
      return
    }

    const latest = resumes[0]

    document.getElementById("scoreText").innerText = latest.score + "%"

    const skillsContainer = document.getElementById("skills")
    skillsContainer.innerHTML = ""

    latest.skills.forEach(skill => {
      const span = document.createElement("span")
      span.className = "skill-tag"
      span.innerText = skill
      skillsContainer.appendChild(span)
    })

    const jobs = document.getElementById("jobs")
    jobs.innerHTML = ""

    latest.jobRoles.forEach(job => {
      const li = document.createElement("li")
      li.innerText = job
      jobs.appendChild(li)
    })

    const companiesContainer = document.getElementById("companies")
    companiesContainer.innerHTML = ""

    const companies = suggestCompanies({
      skills: latest.skills,
      jobRoles: latest.jobRoles
    })

    if (companies.length === 0) {
      companiesContainer.innerHTML = "<li>No suggestions yet</li>"
    } else {
      companies.forEach(c => {
        const li = document.createElement("li")
        li.innerText = c
        companiesContainer.appendChild(li)
      })
    }

    const tips = document.getElementById("tips")
    tips.innerHTML = ""

    latest.suggestions.forEach(tip => {
      const li = document.createElement("li")
      li.innerText = tip
      tips.appendChild(li)
    })

    const list = document.getElementById("resumeList")
    list.innerHTML = ""

    resumes.forEach(resume => {
      const li = document.createElement("li")
      li.innerText = `${resume.fileName} - Score: ${resume.score}%`
      list.appendChild(li)
    })

  } catch (error) {
    console.error("DASHBOARD ERROR:", error)
    alert("Error loading dashboard")
  }
}

function suggestCompanies({ skills = [], jobRoles = [] }) {
  const companyDB = [
    {
      keywords: ["react", "frontend", "javascript"],
      companies: ["Meta", "Google", "Netflix"]
    },
    {
      keywords: ["node", "backend", "api"],
      companies: ["Amazon", "PayPal", "Uber"]
    },
    {
      keywords: ["java", "spring"],
      companies: ["Oracle", "Infosys"]
    },
    {
      keywords: ["python", "ai", "ml"],
      companies: ["OpenAI", "Microsoft"]
    },
    {
      keywords: ["full stack"],
      companies: ["Google", "Amazon"]
    },
    {
      keywords: ["database", "sql", "mongodb"],
      companies: ["IBM", "SAP", "Oracle"]
    }
  ]

  const inputText = [
    ...skills.map(s => s.toLowerCase()),
    ...jobRoles.map(r => r.toLowerCase())
  ]

  const result = new Set()

  companyDB.forEach(entry => {
    entry.keywords.forEach(keyword => {
      if (inputText.some(text => text.includes(keyword))) {
        entry.companies.forEach(c => result.add(c))
      }
    })
  })

  return Array.from(result)
}
function animateScore(score) {
  const circle = document.getElementById("scoreCircle")
  const text = document.getElementById("scoreText")

  let current = 0

  const interval = setInterval(() => {
    if (current >= score) {
      clearInterval(interval)
    } else {
      current++
      text.innerText = current + "%"

      const degree = (current / 100) * 360
      circle.style.background = `conic-gradient(#00f0ff ${degree}deg, #1a1a2e ${degree}deg)`
    }
  }, 15)
}

loadDashboard()

