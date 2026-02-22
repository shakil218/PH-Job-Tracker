const buttons = document.querySelectorAll(".filter-btn");

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
