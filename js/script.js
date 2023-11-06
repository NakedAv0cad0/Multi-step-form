var form1 = document.getElementById("form-1");
var form2 = document.getElementById("form-2");
var form3 = document.getElementById("form-3");
var form4 = document.getElementById("form-4");
var nextBtns = document.querySelectorAll(".next");
var backBtns = document.querySelectorAll(".back");
// load first step input data from the SessionStorage
loadData();
// step 1
form1.addEventListener("submit", function (e) {
    e.preventDefault();
    var validation = checkInfo();
    if (!validation)
        return;
    nextStep();
});
// Functions
document.querySelectorAll("input").forEach(function (input) {
    input.addEventListener("keyup", function () {
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var number = document.getElementById("number");
        var info = {
            name: name.value,
            email: email.value,
            number: number.value
        };
        saveData(info);
    });
}); // save data on blur
function checkInfo() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var number = document.getElementById("number");
    var inputs = document.querySelectorAll("input");
    var info = {
        name: name.value,
        email: email.value,
        number: number.value
    };
    var validation = true;
    var error;
    var missInput;
    var previousErr = document.querySelector(".error-msg");
    if (previousErr) {
        previousErr.remove();
    }
    inputs.forEach(function (input) {
        input.classList.remove("error");
    });
    var validName = /\w{2,}/;
    if (!validName.test(name.value)) {
        name.classList.add("error");
        error = "Please Enter Your Full Name";
        validation = false;
        missInput = name;
    }
    var validEmail = /\w+@\w+\.\w+/gi;
    if (!validEmail.test(email.value) && !error) {
        email.classList.add("error");
        error = "Please Enter a valid eamil";
        validation = false;
        missInput = email;
    }
    var validNumber = /\d{1,}/;
    if (!validNumber.test(number.value) && !error) {
        number.classList.add("error");
        error = "Please Enter a valid phone number";
        validation = false;
        missInput = number;
    }
    if (!validation) {
        var errorEl = document.createElement("span");
        errorEl.innerText = error;
        if (missInput.value === "")
            errorEl.innerText = "This field is required";
        errorEl.classList.add("error-msg");
        missInput.previousElementSibling.appendChild(errorEl);
    }
    saveData(info);
    return validation;
}
// step 2
form2.addEventListener("submit", function (e) {
    e.preventDefault();
    grabSelectedPlan();
    subsPeriode();
});
var plans = document.querySelectorAll(".plans .plan");
var switchBtn = document.querySelector(".switch");
plans.forEach(function (plan) {
    plan.addEventListener("click", function (e) {
        plans.forEach(function (plan) { return plan.classList.remove("active"); });
        plan.classList.add("active");
    });
});
// (year/month) switch btn functionality
switchBtn.addEventListener("click", function () {
    var ball = switchBtn.querySelector("span");
    var arcade = document.querySelector(".arcade span");
    var advanced = document.querySelector(".advanced span");
    var pro = document.querySelector(".pro span");
    var offers = document.querySelectorAll(".offer");
    // make the parcing start with the default value
    arcade.innerText = "$9/mo";
    advanced.innerText = "$12/mo";
    pro.innerText = "$15/mo";
    ball.classList.toggle("yearly");
    // switch the active class between yaerly and monthly palns
    document.querySelectorAll(".options .service").forEach(function (service) {
        service.classList.toggle("active");
    });
    // remove the offer element if they have been added by yearly plan
    offers.forEach(function (offer) {
        offer.remove();
    });
    if (ball.classList.contains("yearly")) {
        arcade.innerText = "$90/yr";
        advanced.innerText = "$120/yr";
        pro.innerText = "$150/yr";
        var offer_1 = document.createElement("span");
        offer_1.classList.add("offer");
        offer_1.innerText = "2 months free";
        plans.forEach(function (plan) {
            plan.appendChild(offer_1.cloneNode(true));
        });
    }
    services.forEach(function (service) {
        service.classList.remove("active");
    });
    document
        .querySelectorAll("#selected-services .service")
        .forEach(function (selectedService) {
        selectedService.remove();
    });
});
// step 3
form3.addEventListener("submit", function (e) {
    e.preventDefault();
    calcTotal();
});
var services = document.querySelectorAll(".add-ons .service");
// switch between yearly and monthly subs
function subsPeriode() {
    var ball = switchBtn.querySelector("span");
    var service1 = document.querySelector(".add-ons .service:first-of-type .service-name~.pricing");
    var service2 = document.querySelector(".add-ons .service:nth-of-type(2) .service-name~.pricing");
    var service3 = document.querySelector(".add-ons .service:last-of-type .service-name~.pricing");
    service1.innerText = "+$1/mo";
    service2.innerText = "+$2/mo";
    service3.innerText = "+$2/mo";
    if (ball.classList.contains("yearly")) {
        service1.innerText = "+$10/yr";
        service2.innerText = "+$20/yr";
        service3.innerText = "+$20/yr";
    }
}
// insert selected services to summry step
services.forEach(function (service) {
    service.addEventListener("click", function () {
        service.classList.toggle("active");
        if (service.classList.contains("active")) {
            var serviceName = service.querySelector(".service-name .service-name").innerHTML;
            var servicePrice = service.querySelector(".pricing").innerHTML;
            var serviceClone = document.createElement("div");
            serviceClone.className = service.className;
            serviceClone.classList.remove("active");
            var cloneName = document.createElement("h4");
            cloneName.innerText = serviceName;
            var clonePrice = document.createElement("span");
            clonePrice.classList.add("price");
            clonePrice.innerText = servicePrice;
            serviceClone.append(cloneName, clonePrice);
            servicesHolder.appendChild(serviceClone);
        }
        else {
            var selectedServices = document.querySelectorAll("#selected-services .service");
            selectedServices.forEach(function (selectedService) {
                if (selectedService.className === service.className) {
                    selectedService.remove();
                }
            });
        }
    });
});
// step 4
form4.addEventListener("submit", function (e) {
    e.preventDefault();
});
var selectedPlanName = document.getElementById("selected-plan");
var selectedPlanPrice = document.getElementById("plan-price");
var servicesHolder = document.getElementById("selected-services");
var change = document.getElementById("change");
change.addEventListener("click", function (e) {
    backStep();
    backStep();
});
function grabSelectedPlan() {
    var currPlanName = document.querySelector(".plans .plan.active h2");
    var currPlanPrice = document.querySelector(".plans .plan.active .current-plan-price");
    selectedPlanName.innerText = currPlanName.innerText;
    selectedPlanPrice.innerText = "+".concat(currPlanPrice.innerText);
}
function calcTotal() {
    var isYearly = Boolean(document.querySelector(".yearly"));
    var total = document.getElementById("total");
    var resulat = 0;
    resulat += parseInt(selectedPlanPrice.innerText.match(/\d+/)[0]);
    var services = servicesHolder.querySelectorAll(".price");
    services.forEach(function (service) {
        resulat += parseInt(service.innerText.match(/\d+/)[0]);
    });
    total.innerText = "+$".concat(resulat, "/");
    if (isYearly) {
        total.innerText += "yr";
        return;
    }
    total.innerText += "mo";
}
// General functions
// back and forward btns functions
function backStep() {
    var step = document.querySelector(".current");
    step.classList.remove("current");
    step.previousElementSibling.classList.add("current");
    var stepsOrder = document.querySelectorAll(".step-order");
    var prevStep;
    stepsOrder.forEach(function (stepOrder) {
        if (stepOrder.classList.contains("active")) {
            stepOrder.classList.remove("active");
            prevStep.classList.add("active");
            return;
        }
        prevStep = stepOrder;
    });
} // remove consoles
function nextStep() {
    var step = document.querySelector(".current");
    step.classList.remove("current");
    step.nextElementSibling.classList.add("current");
    var stepsOrder = document.querySelectorAll(".step-order");
    var current = false;
    stepsOrder.forEach(function (stepOrder) {
        if (current) {
            stepOrder.classList.add("active");
            current = false;
            return;
        }
        if (stepOrder.classList.contains("active")) {
            if (stepOrder.classList.contains("final-step"))
                return;
            stepOrder.classList.remove("active");
            current = true;
        }
    });
}
// Load and Save User's Info
function saveData(_data) {
    sessionStorage.setItem("name", _data.name);
    sessionStorage.setItem("email", _data.email);
    sessionStorage.setItem("number", _data.number);
}
function loadData() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var number = document.getElementById("number");
    if (sessionStorage.name)
        name.value = sessionStorage.name;
    if (sessionStorage.email)
        email.value = sessionStorage.email;
    if (sessionStorage.number)
        number.value = sessionStorage.number;
}
// General Event Listeners
// event listener for back and forward btns
nextBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        if (form1.parentElement.classList.contains("current"))
            return;
        nextStep();
    });
});
backBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var currStep = document.querySelector(".step.current");
        if (currStep.id === "step-2")
            loadData();
        if (form4.parentElement.classList.contains("current"))
            return;
        backStep();
    });
});
