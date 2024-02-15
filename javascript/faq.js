document.addEventListener("DOMContentLoaded", () => {
  const faqList = document.querySelector(".faq-list");

  faqList.addEventListener("click", function (event) {
    const clickedElement = event.target;
    const isQuestionOrAnswer =
      clickedElement.closest(".question") || clickedElement.closest(".answer");

    if (isQuestionOrAnswer) {
      const faqItem = clickedElement.closest(".faq-item");
      toggleFAQItem(faqItem);
    }
  });

  function toggleFAQItem(faqItem) {
    faqItem.classList.toggle("active");

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active");
      }
    });
  }
});
