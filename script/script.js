// get total jobs length with type
const totalCountElements = document.querySelectorAll(".total-count");
let totalInterviewJobsCount = document.getElementById("interview-count");
let totalRejectedJobsCount = document.getElementById("rejected-count");
// get all jobs container
const allJobs = document.querySelector("#jobs-container");

// get all filter buttons
const buttons = document.querySelectorAll(".filter-btn");

// calculate total count of jobs
function calculateCount() {
  const count = allJobs.children.length;
  totalCountElements.forEach((el) => {
    el.innerText = count;
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Reset all buttons
    buttons.forEach((btn) => {
      btn.classList.remove("btn-primary", "scale-105", "shadow-lg");
      btn.classList.add("bg-base-100", "text-gray-500", "scale-100");
    });

    // Activate clicked button
    this.classList.remove("bg-base-100", "text-gray-500", "scale-100");
    this.classList.add("btn-primary", "scale-105", "shadow-lg");
  });
});

// call the calculate total jobs function globally
calculateCount();
