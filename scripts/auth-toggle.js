document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  const mode = document.getElementById("mode");
  const title = document.getElementById("form-title");
  const displayNameField = document.getElementById("displayNameField");

  if (!toggle || !mode || !title || !displayNameField) return;

  toggle.addEventListener("click", () => {
    const isSignUp = mode.value === "signin";

    mode.value = isSignUp ? "signup" : "signin";
    title.textContent = isSignUp ? "Create Account" : "Welcome Back";
    toggle.textContent = isSignUp
      ? "Switch to Sign In"
      : "Switch to Sign Up";

    displayNameField.classList.toggle("hidden", !isSignUp);
  });
});
