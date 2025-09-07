// бургер

const menu = document.querySelector(".header__nav");
const menuBtn = document.querySelector(".header__burger");

const body = document.body;

if (menu && menuBtn) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
    body.classList.toggle("lock");
  });

  menu.querySelectorAll(".header__link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      body.classList.remove("lock");
    });
  });
}

// кастомный селект
function initOrderSelects() {
  const orderSelects = document.querySelectorAll(".order-select");

  orderSelects.forEach((select) => {
    const trigger = select.querySelector(".order-select__trigger");
    const options = select.querySelectorAll(".order-select__option");
    const hiddenSelect = select.querySelector(".hidden-select");
    const triggerText = trigger.querySelector("span");

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();

      orderSelects.forEach((otherSelect) => {
        if (otherSelect !== select) {
          otherSelect.classList.remove("is-open");
        }
      });

      select.classList.toggle("is-open");
    });

    options.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.stopPropagation();

        options.forEach((opt) => opt.classList.remove("is-selected"));

        this.classList.add("is-selected");

        triggerText.textContent = this.textContent;
        trigger.classList.remove("placeholder");

        if (hiddenSelect) {
          hiddenSelect.value = this.dataset.value;
          hiddenSelect.dispatchEvent(new Event("change"));
        }

        select.classList.remove("is-open");
      });
    });
  });

  document.addEventListener("click", function (e) {
    orderSelects.forEach((select) => {
      if (!select.contains(e.target)) {
        select.classList.remove("is-open");
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      orderSelects.forEach((select) => {
        select.classList.remove("is-open");
      });
    }
  });
}

 function initOrderRangeSliders() {
   const sliders = document.querySelectorAll(".order__range-slider");

   sliders.forEach((slider) => {
     const input = slider.querySelector(".order__range-input");
     const fill = slider.querySelector(".order__range-fill");
     const thumb = slider.querySelector(".order__range-thumb");
     const valueDisplay = slider.parentElement.querySelector(
       ".order__range-value"
     );

     function updateSlider() {
       const value = input.value;
       const min = input.min || 0;
       const max = input.max || 100;
       const percentage = ((value - min) / (max - min)) * 100;

       fill.style.width = percentage + "%";
       thumb.style.left = percentage + "%";

       if (valueDisplay) {
         valueDisplay.textContent = value + " %";
       }
     }

     updateSlider();

     input.addEventListener("input", updateSlider);
   });
 }

document.addEventListener("DOMContentLoaded", initOrderSelects);
document.addEventListener("DOMContentLoaded", initOrderRangeSliders);

// файл
document.querySelectorAll(".order__file-input").forEach((input) => {
  input.addEventListener("change", function () {
    const wrapper = this.closest(".order__file-wrapper");
    const status = wrapper.querySelector(".order__file-status");

    if (this.files.length > 0) {
      const fileName = this.files[0].name;
      status.textContent = `Файл "${fileName}" успешно прикреплен`;
    } else {
      status.textContent = "";
    }
  });
});

// Проверка отправки формы
document.querySelector(".order__form").addEventListener("submit", function (e) {

  const formData = new FormData(this);

  const rangeValue = this.querySelector(".order__range-input").value;

  console.log("===== ДАННЫЕ ФОРМЫ =====");
  console.log("Система:", formData.get("system"));
  console.log("Email:", formData.get("email"));
  console.log("Имя:", formData.get("name"));
  console.log("Range значение:", rangeValue);
  console.log("Файл:", formData.get("file"));

  const file = formData.get("file");
  let fileInfo = "Не прикреплен";
  if (file && file.size > 0) {
    fileInfo = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
  }

  alert(`Данные формы:
    Система: ${formData.get("system") || "Не выбрано"}
    Email: ${formData.get("email") || "Не заполнено"}
    Имя: ${formData.get("name") || "Не заполнено"}
    Прогресс: ${rangeValue}%
    Файл: ${fileInfo}`);
});