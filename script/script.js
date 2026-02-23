// ============================
// STATE
// ============================
let jobs = [];
let currentStatus = "All";

// ============================
// DOM ELEMENTS
// ============================
const allContainer = document.getElementById("jobs-container");
const interviewContainer = document.getElementById("interview-section");
const rejectedContainer = document.getElementById("rejected-section");

const totalCountElements = document.querySelectorAll(".total-count");
const totalInterviewJobsCount = document.getElementById("interview-count");
const totalRejectedJobsCount = document.getElementById("rejected-count");

const buttons = document.querySelectorAll(".filter-btn");

// ============================
// INITIALIZE JOBS FROM HTML
// ============================
function initializeJobs() {
  const cards = document.querySelectorAll("#jobs-container .job-card");

  cards.forEach((card, index) => {
    const job = {
      id: index + 1,
      companyName: card.querySelector(".company-name")?.innerText,
      jobRole: card.querySelector(".job-role")?.innerText,
      jobLocation: card.querySelector(".location")?.innerText,
      jobType: card.querySelector(".job-type")?.innerText,
      salaryRange: card.querySelector(".salary")?.innerText,
      jobDescription: card.querySelector(".job-description")?.innerText,
      jobStatus: "Not Applied",
    };
    jobs.push(job);
  });
}

initializeJobs();
renderAllSections();

// ============================
// FILTER BUTTON LOGIC
// ============================
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => {
      btn.classList.remove("btn-primary", "scale-105", "shadow-lg");
      btn.classList.add("bg-base-100", "text-gray-500", "scale-100");
    });

    this.classList.remove("bg-base-100", "text-gray-500", "scale-100");
    this.classList.add("btn-primary", "scale-105", "shadow-lg");

    currentStatus = this.innerText;
    updateVisibleSection();
  });
});

// ============================
// GLOBAL EVENT DELEGATION
// ============================
document.addEventListener("click", function (e) {
  // ========================
  // GLOBAL DELETE
  // ========================
  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    const card = e.target.closest(".job-card");
    if (!card) return;

    const companyName = card.querySelector(".company-name")?.innerText;
    const jobRole = card.querySelector(".job-role")?.innerText;

    // Ask for confirmation
    const confirmed = confirm(
      `Are you sure you want to permanently delete the job:
      ${companyName} - ${jobRole}?
      `,
    );

    if (!confirmed) return; // user clicked cancel

    // Remove job from master array
    jobs = jobs.filter(
      (j) => !(j.companyName === companyName && j.jobRole === jobRole),
    );

    renderAllSections();
    return;
  }

  // ========================
  // INTERVIEW / REJECT BUTTON
  // ========================
  if (
    !e.target.classList.contains("interview-btn") &&
    !e.target.classList.contains("reject-btn")
  )
    return;

  const card = e.target.closest(".job-card");
  if (!card) return;

  const companyName = card.querySelector(".company-name")?.innerText;
  const jobRole = card.querySelector(".job-role")?.innerText;

  const job = jobs.find(
    (j) => j.companyName === companyName && j.jobRole === jobRole,
  );

  if (!job) return;

  if (e.target.classList.contains("interview-btn")) {
    job.jobStatus = "Interview";
  }

  if (e.target.classList.contains("reject-btn")) {
    job.jobStatus = "Rejected";
  }

  renderAllSections();
});

// ============================
// RENDER ALL SECTIONS
// ============================
function renderAllSections() {
  allContainer.innerHTML = "";
  interviewContainer.innerHTML = "";
  rejectedContainer.innerHTML = "";

  let interviewCount = 0;
  let rejectedCount = 0;

  jobs.forEach((job) => {
    // All Jobs
    allContainer.appendChild(createJobCard(job));

    // Interview
    if (job.jobStatus === "Interview") {
      interviewContainer.appendChild(createJobCard(job));
      interviewCount++;
    }

    // Rejected
    if (job.jobStatus === "Rejected") {
      rejectedContainer.appendChild(createJobCard(job));
      rejectedCount++;
    }
  });

  // Empty state
  if (interviewCount === 0) {
    interviewContainer.innerHTML = emptyStateTemplate("No Interview Jobs Yet");
  }

  if (rejectedCount === 0) {
    rejectedContainer.innerHTML = emptyStateTemplate("No Rejected Jobs Yet");
  }

  calculateCount();
  updateVisibleSection();
}

// ============================
// CREATE JOB CARD
// ============================
function createJobCard(job) {
  const div = document.createElement("div");
  div.className = "space-y-5";

  div.innerHTML = `
    <div class="card bg-base-100 shadow-md job-card">
      <div class="card-body">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="company-name card-title text-xl">${job.companyName}</h2>
            <p class="job-role text-gray-500 font-semibold">${job.jobRole}</p>
            <p class="text-sm text-gray-500">
              <span class="location">${job.jobLocation}</span> · 
              <span class="job-type">${job.jobType}</span> · 
              <span class="salary">${job.salaryRange}</span>
            </p>
          </div>
          <button class="btn btn-circle delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

        <div class="mt-2">
          <div class="px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(job.jobStatus)}">
            ${job.jobStatus}
          </div>
        </div>

        <p class="job-description text-gray-600 mt-2">
          ${job.jobDescription}
        </p>

        <div class="card-actions justify-end mt-3">
          <button class="btn btn-outline btn-success btn-sm interview-btn">
            Interview
          </button>
          <button class="btn btn-outline btn-error btn-sm reject-btn">
            Rejected
          </button>
        </div>
      </div>
    </div>
  `;

  return div;
}

// ============================
// EMPTY STATE TEMPLATE
// ============================
function emptyStateTemplate(message) {
  return `
    <div class="empty-state bg-base-100 shadow-md text-center rounded-lg py-16">
      <i class="fa-solid fa-file-lines fa-3x"></i>
      <h3 class="text-xl font-semibold">${message}</h3>
      <p class="text-gray-400">
        Check back soon for new job opportunities
      </p>
    </div>
  `;
}

// ============================
// UPDATE VISIBLE SECTION
// ============================
function updateVisibleSection() {
  if (currentStatus === "Interview") {
    allContainer.classList.add("hidden");
    rejectedContainer.classList.add("hidden");
    interviewContainer.classList.remove("hidden");
  } else if (currentStatus === "Rejected") {
    allContainer.classList.add("hidden");
    interviewContainer.classList.add("hidden");
    rejectedContainer.classList.remove("hidden");
  } else {
    allContainer.classList.remove("hidden");
    interviewContainer.classList.add("hidden");
    rejectedContainer.classList.add("hidden");
  }
}

// ============================
// CALCULATE COUNTS
// ============================
function calculateCount() {
  totalCountElements.forEach((el) => {
    el.innerText = jobs.length;
  });

  totalInterviewJobsCount.innerText = jobs.filter(
    (job) => job.jobStatus === "Interview",
  ).length;

  totalRejectedJobsCount.innerText = jobs.filter(
    (job) => job.jobStatus === "Rejected",
  ).length;
}

// ============================
// STATUS STYLE FUNCTION
// ============================
function getStatusStyle(status) {
  if (status === "Interview") {
    return "badge badge-soft badge-success job-status";
  }
  if (status === "Rejected") {
    return "badge badge-soft badge-error job-status";
  }
  return "badge badge-soft badge-info job-status";
}
