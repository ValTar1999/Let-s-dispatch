


// Parallax block

let myPanel = document.getElementById("panel");
let subpanel = document.getElementById("panel-container");

myPanel.onmousemove = transformPanel;
myPanel.onmouseenter = handleMouseEnter;
myPanel.onmouseleave = handleMouseLeave;

let mouseX, mouseY;

let transformAmount = 5;

function transformPanel(mouseEvent) {
    mouseX = mouseEvent.pageX;
    mouseY = mouseEvent.pageY;

    const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
    const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;

    const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
    const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));

    subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
}

function handleMouseEnter() {
    setTimeout(() => {
        subpanel.style.transition = "";
    }, 100);
    subpanel.style.transition = "transform 0.1s";
}

function handleMouseLeave() {
    subpanel.style.transition = "transform 0.1s";
    setTimeout(() => {
        subpanel.style.transition = "";
    }, 100);

    subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
}










const openPopUp = document.getElementById('open-pop__up');
const closePopUp = document.getElementById('pop-up__close');
const popUp = document.getElementById('pop-up');

openPopUp.addEventListener('click', function(e){
  e.preventDefault();
  popUp.classList.add('active');
})

closePopUp.addEventListener('click', () => {
  popUp.classList.remove('active');
})












const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck); // обработка кнопки "Отправить"

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

// Здесь проверяем, можно ли отправить форму
function formCheck(e) {
  e.preventDefault(); // блокируем input
  const allValid = []; // создаем массив валидных значений
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid")); // проверяем каждое поле
  });
  const isAllValid = allValid.reduce((acc, current) => {
    // проверяем, чтобы все было правильно
    return acc && current;
  });
  if (!Boolean(Number(isAllValid))) {
    alert("Заполните поля правильно!"); // если не правильно - сообщение пользователю
    return;
  }
  formSubmit(); // если правильно - отправляем данные
}



async function formSubmit() {
    const data = serializeForm(form); // получаем данные формы
    const response = await sendData(data); // отправляем данные на почту
    if (response.ok) {
      let result = await response.json(); // если ответ OK отвечает пользователю
      alert(result.message); // .. что данные отправлены
      formReset(); // сбрасываем поля формы
    } else {
      alert("Код ошибки: " + response.status); // если not OK - показываем код ошибки
    }
  }
  
  function serializeForm(formNode) {
    // формируем данные формы
    return new FormData(form);
  }
  
  async function sendData(data) {
    return await fetch("send_mail.php",{
      // отправляем в скрипт send_mail.php
      method: "POST", // методом POST
      body: data,
    });
  }
  
  function formReset() {
    // сброс полей формы
    form.reset();
    validFormArr.forEach((el) => {
      el.setAttribute("is-valid", 0);
      el.style.border = "none";
    });
  }






















const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {

    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {

    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }

    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {

    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {

    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);