let jobsData = [];
let currentCountry = null;

// Load JSON data
fetch("jobsData.json")
  .then((response) => response.json())
  .then((data) => {
    jobsData = data;
    currentCountry = jobsData[0].country; // default to first country
    renderJobs(currentCountry); // render all categories for default
  })
  .catch((error) => {
    console.error("Error loading job data:", error);
  });

// Flag (country) click handler
document.querySelectorAll(".country-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const country = btn.getAttribute("data-country");
    if (country) {
      currentCountry = country;
      renderJobs(currentCountry);
    }
  });
});

// Sidebar (category) click handler
document.querySelectorAll(".sidebar-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    if (category) {
      renderJobs(currentCountry, category);
    }
  });
});

// Main render function
function renderJobs(country, selectedCategory = null) {
  const countryData = jobsData.find((c) => c.country === country);
  if (!countryData) return;

  // Hide all job sections
  document.querySelectorAll(".job-section").forEach((section) => {
    section.style.display = "none";
  });

  countryData.categories.forEach((categoryData) => {
    const category = categoryData.category;
    const section = document.getElementById(category);
    if (!section) return;

    // If a specific category is selected, skip others
    if (selectedCategory && selectedCategory !== category) return;

    section.style.display = "block";
    const container = section.querySelector(".row");
    container.innerHTML = "";

    categoryData.jobs.forEach((job) => {
      container.innerHTML += `
        <div class="col-md-4">
          <div class="job-box">
            <h5>${job.title}</h5>
            <p><b>$${job.salary.toLocaleString()}</b></p>
            <div class="salary-info">
              <div class="low-high">
                <p>low</p>
                <p><b>$${job.low.toLocaleString()}</b></p>
              </div>
              <div class="low-high">
                <p>high</p>
                <p><b>$${job.high.toLocaleString()}</b></p>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });
}
//login 

  // Handle signup form submission
  document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Signed up successfully as " + name);
    document.getElementById("signupForm").reset();
    const signupModal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
    signupModal.hide();
  });

  // Handle login form submission
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    alert("Logged in as: " + email);
    document.getElementById("loginForm").reset();
    const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
    loginModal.hide();
  });


// Update your signup/login buttons to trigger modals -->

  document.querySelectorAll('button:contains("Signup")').forEach(btn => {
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#signupModal');
  });

  document.querySelectorAll('button:contains("Login")').forEach(btn => {
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#loginModal');
  });
