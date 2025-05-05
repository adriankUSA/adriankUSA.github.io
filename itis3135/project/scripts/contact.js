document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // AJAX simulation
    setTimeout(() => {
        document.getElementById("contact-form").style.display = "none";
        document.getElementById("thank-you").style.display = "block";
    }, 500);
});