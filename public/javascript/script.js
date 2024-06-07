const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

// Sign-in form validation
secondForm.addEventListener("submit", (e) => {
    const email = secondForm.querySelector('input[placeholder="Email"]').value;
    const password = secondForm.querySelector('input[placeholder="Password"]').value;

    if (!email || !password) {
        e.preventDefault();
        alert("Please fill in all fields.");
    } else if (!validateEmail(email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
    }
});

// Sign-up form validation
firstForm.addEventListener("submit", (e) => {
    const user = firstForm.querySelector('input[placeholder="User"]').value;
    const email = firstForm.querySelector('input[placeholder="Email"]').value;
    const password = firstForm.querySelector('input[placeholder="Password"]').value;

    if (!user || !email || !password) {
        e.preventDefault();
        alert("Please fill in all fields.");
    } else if (!validateEmail(email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
