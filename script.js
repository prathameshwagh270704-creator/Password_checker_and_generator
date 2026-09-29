// ==========================================
// PASSWORD STRENGTH CHECKER
// ==========================================

function checkPasswordStrength(password) {

    let score = 0;
    let feedback = [];


    // Length
    if (password.length >= 8) {
        score += 1;
    } else {
        feedback.push("Use at least 8 characters.");
    }


    // Uppercase
    if (/[A-Z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add at least one uppercase letter.");
    }


    // Lowercase
    if (/[a-z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add at least one lowercase letter.");
    }


    // Number
    if (/[0-9]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add at least one number.");
    }


    // Special character
    if (/[!@#$%^&*(),.?"':{}|<>_\-+=/\\[\]]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add at least one special character.");
    }


    // Strength
    let strength;

    if (score <= 2) {
        strength = "WEAK";
    } else if (score <= 4) {
        strength = "MEDIUM";
    } else {
        strength = "STRONG";
    }


    return {
        strength: strength,
        feedback: feedback
    };
}


// ==========================================
// SHA-256
// ==========================================

async function sha256(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return new Uint8Array(hashBuffer);
}


// ==========================================
// FIXED-LENGTH DETERMINISTIC TRANSFORMATION
// ==========================================

async function generateFixedPassword(password) {

    // Create SHA-256 digest
    const digest = await sha256(password);


    // Characters that can appear in output
    const characters =
        "abcdefghijklmnopqrstuvwxyz" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "0123456789" +
        "!@#$%^&*";


    let result = "";


    // Generate exactly the same number
    // of characters as original password

    for (let i = 0; i < password.length; i++) {

        // Use digest bytes to select characters
        const index =
            digest[i % digest.length] % characters.length;

        result += characters[index];
    }


    return result;
}


// ==========================================
// MAIN PROGRAM
// ==========================================

const passwordInput =
    document.getElementById("password");

const checkButton =
    document.getElementById("checkButton");

const togglePassword =
    document.getElementById("togglePassword");


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "Show";
    }

});


// ==========================================
// CHECK PASSWORD
// ==========================================

checkButton.addEventListener("click", async function () {

    const password = passwordInput.value;


    // Check strength
    const result =
        checkPasswordStrength(password);


    // Display strength
    document.getElementById("strength")
        .textContent = result.strength;


    // Display suggestions
    const suggestions =
        document.getElementById("suggestions");

    suggestions.innerHTML = "";


    if (result.feedback.length > 0) {

        const heading =
            document.createElement("p");

        heading.textContent = "Suggestions:";

        suggestions.appendChild(heading);


        for (const suggestion of result.feedback) {

            const paragraph =
                document.createElement("p");

            paragraph.textContent =
                "- " + suggestion;

            suggestions.appendChild(paragraph);
        }
    }


    // Generate fixed-length password
    const generatedPassword =
        await generateFixedPassword(password);


    // Display generated password
    document.getElementById("generatedPassword")
        .textContent = generatedPassword;


    // Display lengths
    document.getElementById("originalLength")
        .textContent = password.length;

    document.getElementById("generatedLength")
        .textContent = generatedPassword.length;


    // Length check
    if (password.length === generatedPassword.length) {

        document.getElementById("lengthCheck")
            .textContent = "PASSED";

    } else {

        document.getElementById("lengthCheck")
            .textContent = "FAILED";
    }

});
