// Step 1
const form1 = document.getElementById("form-1") as HTMLFormElement;
const form2 = document.getElementById("form-2") as HTMLFormElement;
const form3 = document.getElementById("form-3") as HTMLFormElement;
const form4 = document.getElementById("form-4") as HTMLFormElement;

const nextBtns = document.querySelectorAll(".next");
const backBtns = document.querySelectorAll(".back");

loadData();
// Selected Options

// const selected

// step 1

// Event Listener
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  let validation: boolean = checkInfo();
  if (!validation) return;
  nextStep();
});

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (form1.parentElement.classList.contains("current")) return;
    nextStep();
  });
});

backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let currStep = document.querySelector(".step.current") as Element;
    if (currStep.id === "step-2") loadData();
    backStep();
  });
});

// Functions
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keyup", () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const number = document.getElementById("number") as HTMLInputElement;
    let info: {
      name: string;
      email: string;
      number: string;
    } = {
      name: name.value,
      email: email.value,
      number: number.value,
    };
    saveData(info);
  });
}); // save data on blur

function checkInfo() {
  const name = document.getElementById("name") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const number = document.getElementById("number") as HTMLInputElement;
  const inputs = document.querySelectorAll("input");

  let info: {
    name: string;
    email: string;
    number: string;
  } = {
    name: name.value,
    email: email.value,
    number: number.value,
  };

  let validation: boolean = true;
  let error: string;
  let missInput: HTMLInputElement;
  let previousErr = document.querySelector(".error-msg") as HTMLSpanElement;
  if (previousErr) {
    previousErr.remove();
  }

  inputs.forEach((input) => {
    input.classList.remove("error");
  });

  const validName: RegExp = /\w{2,}/;
  if (!validName.test(name.value)) {
    name.classList.add("error");
    error = "Please Enter Your Full Name";
    validation = false;
    missInput = name;
  }

  const validEmail: RegExp = /\w+@\w+\.\w+/gi;
  if (!validEmail.test(email.value) && !error) {
    email.classList.add("error");
    error = "Please Enter a valid eamil";
    validation = false;
    missInput = email;
  }
  const validNumber: RegExp = /\d{1,}/;
  if (!validNumber.test(number.value) && !error) {
    number.classList.add("error");
    error = "Please Enter a valid phone number";
    validation = false;
    missInput = number;
  }

  if (!validation) {
    let errorEl = document.createElement("span");
    errorEl.innerText = error;
    if (missInput.value === "") errorEl.innerText = "This field is required";
    errorEl.classList.add("error-msg");
    missInput.previousElementSibling.appendChild(errorEl);
  }

  saveData(info);
  return validation;
}
// Load and Save User's Info
function saveData(_data: { name: string; email: string; number: string }) {
  sessionStorage.setItem("name", _data.name);
  sessionStorage.setItem("email", _data.email);
  sessionStorage.setItem("number", _data.number);
}
function loadData() {
  const name = document.getElementById("name") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const number = document.getElementById("number") as HTMLInputElement;
  if (sessionStorage.name) name.value = sessionStorage.name;
  if (sessionStorage.email) email.value = sessionStorage.email;
  if (sessionStorage.number) number.value = sessionStorage.number;
}

// step 2
const plans = document.querySelectorAll(".plans .plan");
const switchBtn = document.querySelector(".switch");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  checkData();
  subsPeriode();
});

plans.forEach((plan) => {
  plan.addEventListener("click", (e) => {
    plans.forEach((plan) => plan.classList.remove("active"));
    plan.classList.add("active");
  });
});

switchBtn.addEventListener("click", () => {
  let ball = switchBtn.querySelector("span");
  const arcade = document.querySelector(".arcade span") as HTMLSpanElement;
  const advanced = document.querySelector(".advanced span") as HTMLSpanElement;
  const pro = document.querySelector(".pro span") as HTMLSpanElement;
  let offers = document.querySelectorAll(".offer");

  // change parcing start with the default value
  arcade.innerText = "$9/mo";
  advanced.innerText = "$12/mo";
  pro.innerText = "$15/mo";

  ball.classList.toggle("yearly");

  // switch the active class between yaerly and monthly palns
  document.querySelectorAll(".options .service").forEach((service) => {
    service.classList.toggle("active");
  });

  // remove free months if they have been added by yearly plan
  offers.forEach((offer) => {
    offer.remove();
  });

  if (ball.classList.contains("yearly")) {
    arcade.innerText = "$90/yr";
    advanced.innerText = "$120/yr";
    pro.innerText = "$150/yr";

    let offer = document.createElement("span");
    offer.classList.add("offer");
    offer.innerText = "2 months free";

    // add the offer span to all plans
    plans.forEach((plan) => {
      plan.appendChild(offer.cloneNode(true));
    });
  }

  services.forEach((service) => {
    service.classList.remove("active");
  });
  document
    .querySelectorAll("#selected-services .service")
    .forEach((selectedService) => {
      selectedService.remove();
    });
});

// step 3
let services = document.querySelectorAll(".add-ons .service");

form3.addEventListener("submit", (e) => {
  e.preventDefault();
  calcTotal();
});

function subsPeriode() {
  let ball = switchBtn.querySelector("span");

  let service1 = document.querySelector(
    ".add-ons .service:first-of-type .service-name~.pricing"
  ) as HTMLSpanElement;
  let service2 = document.querySelector(
    ".add-ons .service:nth-of-type(2) .service-name~.pricing"
  ) as HTMLSpanElement;
  let service3 = document.querySelector(
    ".add-ons .service:last-of-type .service-name~.pricing"
  ) as HTMLSpanElement;

  service1.innerText = "+$1/mo";
  service2.innerText = "+$2/mo";
  service3.innerText = "+$2/mo";

  if (ball.classList.contains("yearly")) {
    service1.innerText = "+$10/yr";
    service2.innerText = "+$20/yr";
    service3.innerText = "+$20/yr";
  }
}

services.forEach((service) => {
  service.addEventListener("click", () => {
    service.classList.toggle("active");

    if (service.classList.contains("active")) {
      let serviceName = service.querySelector(
        ".service-name .service-name"
      ).innerHTML;
      let servicePrice = service.querySelector(".pricing").innerHTML;

      let serviceClone = document.createElement("div");
      serviceClone.className = service.className;
      serviceClone.classList.remove("active");

      let cloneName = document.createElement("h4");
      cloneName.innerText = serviceName;

      let clonePrice = document.createElement("span");
      clonePrice.classList.add("price");
      clonePrice.innerText = servicePrice;

      serviceClone.append(cloneName, clonePrice);

      servicesHolder.appendChild(serviceClone);
    } else {
      let selectedServices = document.querySelectorAll(
        "#selected-services .service"
      );
      selectedServices.forEach((selectedService) => {
        if (selectedService.className === service.className) {
          selectedService.remove();
        }
      });
    }
  });
});

// step 4

form4.addEventListener("submit", (e) => {
  e.preventDefault();
});

const selectedPlanName = document.getElementById(
  "selected-plan"
) as HTMLHeadingElement;
const selectedPlanPrice = document.getElementById(
  "plan-price"
) as HTMLHeadingElement;

const servicesHolder = document.getElementById("selected-services");

const change = document.getElementById("change") as Element;
change.addEventListener("click", (e) => {
  form4.parentElement.classList.remove("current");
  form2.parentElement.classList.add("current");
});

function checkData() {
  let currPlanName = document.querySelector(
    ".plans .plan.active h2"
  ) as HTMLHeadingElement;
  let currPlanPrice = document.querySelector(
    ".plans .plan.active .current-plan-price"
  ) as HTMLHeadingElement;
  console.log("+".concat(currPlanPrice.innerText), currPlanName.innerText);

  selectedPlanName.innerText = currPlanName.innerText;
  selectedPlanPrice.innerText = "+".concat(currPlanPrice.innerText);
}
// General events

// General Functions

function calcTotal() {
  let isYearly: boolean = Boolean(document.querySelector(".yearly"));
  const total = document.getElementById("total") as HTMLSpanElement;
  let resulat: number = 0;
  resulat += parseInt(selectedPlanPrice.innerText.match(/\d+/)[0]);
  const services = servicesHolder.querySelectorAll(".price");
  services.forEach((service: HTMLSpanElement) => {
    resulat += parseInt(service.innerText.match(/\d+/)[0]);
  });
  total.innerText = `+$${resulat}/`;
  if (isYearly) {
    total.innerText += "yr";
    return;
  }
  total.innerText += "mo";
}

function backStep() {
  let step = document.querySelector(".current");
  step.classList.remove("current");
  step.previousElementSibling.classList.add("current");

  let stepsOrder = document.querySelectorAll(".step-order");
  let prevStep: Element;
  stepsOrder.forEach((stepOrder) => {
    if (stepOrder.classList.contains("active")) {
      stepOrder.classList.remove("active");
      prevStep.classList.add("active");
      return;
    }
    prevStep = stepOrder;
  });
} // remove consoles
function nextStep() {
  let step = document.querySelector(".current");
  step.classList.remove("current");
  step.nextElementSibling.classList.add("current");

  let stepsOrder = document.querySelectorAll(".step-order");
  let current = false;
  stepsOrder.forEach((stepOrder) => {
    if (current) {
      stepOrder.classList.add("active");
      current = false;
      return;
    }
    if (stepOrder.classList.contains("active")) {
      stepOrder.classList.remove("active");
      current = true;
    }
  });
}
