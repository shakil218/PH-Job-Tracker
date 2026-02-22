// let totalInterviewJobsList = [];
// let totalRejectedJobsList = [];
// // get total jobs length with type
// const totalCountElements = document.querySelectorAll(".total-count");
// let totalInterviewJobsCount = document.getElementById("interview-count");
// let totalRejectedJobsCount = document.getElementById("rejected-count");
// // get all jobs container
// const allJobs = document.querySelector("#jobs-container");

// // get all filter buttons
// const buttons = document.querySelectorAll(".filter-btn");

// // calculate total count of jobs
// function calculateCount() {
//   const count = allJobs.children.length;
//   totalCountElements.forEach((el) => {
//     el.innerText = count;
//   });
//   totalInterviewJobsCount.innerText = totalInterviewJobsList.length;
//   totalRejectedJobsCount.innerText = totalRejectedJobsList.length;
// }

//  buttons.forEach((button) => {
//    button.addEventListener("click", function () {
//      // Reset all buttons
//      buttons.forEach((btn) => {
//       btn.classList.remove("btn-primary", "scale-105", "shadow-lg");
//        btn.classList.add("bg-base-100", "text-gray-500", "scale-100");
//      });

//      // Activate clicked button
//      this.classList.remove("bg-base-100", "text-gray-500", "scale-100");
//      this.classList.add("btn-primary", "scale-105", "shadow-lg");
//    });
//  });

// // call the calculate total jobs function globally
// calculateCount();

let totalInterviewJobsList = [];
let totalRejectedJobsList = [];

// counters
const totalCountElements = document.querySelectorAll(".total-count");
let totalInterviewJobsCount = document.getElementById("interview-count");
let totalRejectedJobsCount = document.getElementById("rejected-count");

// cards container
const allJobs = document.querySelector("#jobs-container");

// get all filter buttons
const buttons = document.querySelectorAll(".filter-btn");

// ============================
// Calculate Count
// ============================
function calculateCount() {
  const total = allJobs.querySelectorAll(".job-card").length;

  totalCountElements.forEach((el) => {
    el.innerText = total;
  });

  totalInterviewJobsCount.innerText = totalInterviewJobsList.length;
  totalRejectedJobsCount.innerText = totalRejectedJobsList.length;
}

// toggle buttons
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

// ============================
// Event Delegation
// ============================
allJobs.addEventListener("click", function (e) {
  const card = e.target.closest(".job-card");
  if (!card) return;

  const jobId = card.dataset.id;
  const currentStatus = card.dataset.status;

  if (e.target.classList.contains("interview-btn")) {
    updateStatus(card, jobId, currentStatus, "interview");
  }

  if (e.target.classList.contains("reject-btn")) {
    updateStatus(card, jobId, currentStatus, "rejected");
  }
});

// ============================
// Status Update Logic
// ============================
function updateStatus(card, jobId, currentStatus, newStatus) {
  if (currentStatus === newStatus) return;

  // Remove from old list
  if (currentStatus === "interview") {
    totalInterviewJobsList = totalInterviewJobsList.filter(
      (id) => id !== jobId,
    );
  }

  if (currentStatus === "rejected") {
    totalRejectedJobsList = totalRejectedJobsList.filter((id) => id !== jobId);
  }

  // Add to new list
  if (newStatus === "interview") {
    totalInterviewJobsList.push(jobId);
    updateBadge(card, "INTERVIEW", "badge-success");
  }

  if (newStatus === "rejected") {
    totalRejectedJobsList.push(jobId);
    updateBadge(card, "REJECTED", "badge-error");
  }

  card.dataset.status = newStatus;

  calculateCount();
}

// ============================
// Update Badge Text
// ============================
function updateBadge(card, text, badgeClass) {
  const badge = card.querySelector(".badge");

  badge.innerText = text;

  badge.classList.remove("badge-info", "badge-success", "badge-error");
  badge.classList.add(badgeClass);
}

// Initial count
calculateCount();
