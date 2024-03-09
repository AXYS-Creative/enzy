const mailForm = document.querySelector(".mail-form"),
  successMessage = document.querySelector(".success-message"),
  errorMessage = document.querySelector(".error-message"),
  emailInputField = document.querySelector(".email-input-field");

const handleSubmit = (event) => {
  event.preventDefault();

  const email = emailInputField.value;
  let submittedEmails =
    JSON.parse(localStorage.getItem("submittedEmails")) || [];

  if (submittedEmails.includes(email)) {
    errorMessage.classList.add("active");
    errorMessage.setAttribute("aria-hidden", false);

    setTimeout(function () {
      errorMessage.classList.remove("active");
      errorMessage.setAttribute("aria-hidden", true);
    }, 5000);

    return;
  } else {
    submittedEmails.push(email);
    localStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));
  }

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      successMessage.classList.add("active");
      successMessage.setAttribute("aria-hidden", false);

      setTimeout(function () {
        successMessage.classList.remove("active");
        successMessage.setAttribute("aria-hidden", true);
      }, 5000);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert(error);
    });
};

mailForm.addEventListener("submit", handleSubmit);
