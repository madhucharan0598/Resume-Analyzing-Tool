const dropZone = document.getElementById("dropZone")
const fileInput = document.getElementById("resumeFile")
const fileName = document.getElementById("fileName")
let uploadedFile = null
function selectFile() {
  fileInput.click()
}
fileInput.addEventListener("change", function () {
  uploadedFile = this.files[0]
  fileName.innerText = uploadedFile.name
})

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault()
  dropZone.classList.add("dragover")
})
dropZone.addEventListener("dragleave", function () {
  dropZone.classList.remove("dragover")
})
dropZone.addEventListener("drop", function (e) {
  e.preventDefault()
  dropZone.classList.remove("dragover")
  uploadedFile = e.dataTransfer.files[0]
  fileName.innerText = uploadedFile.name
})

async function uploadResume(){
  if(!uploadedFile){
    alert("Upload file first")
    return
  }

  try{
    console.log("Uploading file...")
    const res = await uploadResumeAPI(uploadedFile)
    console.log("SERVER RESPONSE:", res)
    if(res.success){
      alert("Upload successful..")
      window.location.href = "dashboard.html"
    } else {
      alert(res.message || "Upload failed from server")
    }
  }catch(error){
    console.error("UPLOAD ERROR:", error)
    alert("Upload failed..")
  }
}