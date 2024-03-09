const mailForm = document.querySelector(".mail-form"),
  confirmation = document.querySelector(".confirmation-message"),
  errorMessage = document.querySelector(".error-message"),
  emailInputField = document.querySelector(".email-input-field");

const handleSubmit = (event) => {
  event.preventDefault();

  const email = emailInputField.value;
  let submittedEmails =
    JSON.parse(localStorage.getItem("submittedEmails")) || [];

  if (submittedEmails.includes(email)) {
    mailForm.classList.add("active");
    errorMessage.classList.add("active");
    errorMessage.setAttribute("aria-hidden", false);

    setTimeout(function () {
      mailForm.classList.remove("active");
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
      mailForm.classList.add("active");
      confirmation.classList.add("active");
      confirmation.setAttribute("aria-hidden", false);

      setTimeout(function () {
        mailForm.classList.remove("active");
        confirmation.classList.remove("active");
        confirmation.setAttribute("aria-hidden", true);
      }, 5000);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert(error);
    });
};

mailForm.addEventListener("submit", handleSubmit);
