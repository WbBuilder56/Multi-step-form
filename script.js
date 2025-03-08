const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const steps = document.querySelectorAll('.step');
const form_steps = document.querySelectorAll('.form-step');
let active = 1;

nextButton.addEventListener('click', () => {
    active++;
    if(active > steps.length) {
        active = steps.length;
    }
    updateProgress();
})

prevButton.addEventListener('click', () => {
    active--;
    if(active < 1) {
        active = 1;
    }
    updateProgress();
})

const updateProgress = () => {
    console.log('steps.length =>' + steps.length);
    console.log('active =>' + active);
    // toggle .active class for each list item
    steps.forEach((step, i) => {
        if(i == (active-1)) {
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i =>', +i);
        } else{
            step.classList.remove('active');
            form_steps[i].classList.remove('active');
        }
    });
    // enable or disable prev and next buttons
    if(active === 1) {
        prevButton.disabled = true;
    } else if(active === steps.length) {
        nextButton.disabled = true;
    }else{
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtn = document.querySelector(".btn-next");
    const prevBtn = document.querySelector(".btn-prev");
    const submitBtn = document.querySelector(".btn-submit");
    const inputs = document.querySelectorAll("input, select");
    let currentStep = 0;

    // Function to save form data
    function saveFormData() {
        const formData = {};
        inputs.forEach(input => {
            if (input.name) { // Only save fields with names
                if (input.type === "checkbox") {
                    formData[input.name] = input.checked;
                } else {
                    formData[input.name] = input.value;
                }
            }
        });
        localStorage.setItem("formData", JSON.stringify(formData));
    }

    // Function to load saved form data
    function loadFormData() {
        const savedData = JSON.parse(localStorage.getItem("formData"));
        if (savedData) {
            inputs.forEach(input => {
                if (input.name && savedData.hasOwnProperty(input.name)) {
                    if (input.type === "checkbox") {
                        input.checked = savedData[input.name];
                    } else if (input.type === "date" || input.type === "number" || input.type === "tel") {
                        input.value = savedData[input.name] || ""; // Handle empty or invalid values
                    } else {
                        input.value = savedData[input.name];
                    }
                }
            });
        }
    }

    // Function to show the current step
    function showStep(step) {
        formSteps.forEach((stepDiv, index) => {
            stepDiv.classList.toggle("active", index === step);
        });
        prevBtn.disabled = step === 0;
        nextBtn.style.display = step === formSteps.length - 1 ? "none" : "inline-block";
        submitBtn.style.display = step === formSteps.length - 1 ? "inline-block" : "none";
    }

    // Event listeners
    nextBtn.addEventListener("click", () => {
        if (currentStep < formSteps.length - 1) {
            currentStep++;
            showStep(currentStep);
            saveFormData();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    inputs.forEach(input => input.addEventListener("input", saveFormData));

    // Submit button functionality
    submitBtn.addEventListener("click", () => {
        alert("Your form is submitted successfully!");
        localStorage.removeItem("formData"); // Clear saved data
        window.location.reload(); // Reload the page
    });

    // Load saved data and show the first step
    loadFormData();
    showStep(currentStep);
});
