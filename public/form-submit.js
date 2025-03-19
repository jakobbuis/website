document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        clear(form);
        const formData = new FormData(form);
        const target = form.getAttribute('action');
        const method = form.getAttribute('method');

        spinner(form);
        Promise.all([
            new Promise((resolve) => setTimeout(() => resolve(null), 1500)),
            fetch(target, {
                method: method,
                body: formData,
            }),
        ]).then(([auth, response]) => {
            clear(form);
            if (!response.ok) {
                showError(form, response);
            } else {
                success(form);
            }
        });
    });
});

function clear(form) {
    form.querySelectorAll(':scope .form-message').forEach(m => m.remove());
    var button = form.querySelectorAll(':scope button[type="submit"]')[0];
    button.removeAttribute("disabled");
}

function spinner(form) {
    var button = form.querySelectorAll(':scope button[type="submit"]')[0];
    button.setAttribute("disabled", "disabled");
    var spinner = document.createElement("span");
    spinner.classList.add("form-message", "spinner");
    spinner.innerHTML = "🔄 Sending...";
    button.after(spinner);
}

function success(form) {
    var button = form.querySelectorAll(':scope button[type="submit"]')[0];
    var success = document.createElement("span");
    success.classList.add("form-message", "success");
    success.innerHTML = "✅ Sent";
    button.after(success);
}

function showError(form, response) {
    var button = form.querySelectorAll(':scope button[type="submit"]')[0];
    var error = document.createElement("span");
    error.classList.add("form-message", "failure");
    if (!response) {
        error.innerHTML = "❌ Failed to sent: unknown error";
        button.after(error);
    } else {
        response.text().then(text => {
            error.innerHTML = "❌ Failed to sent: " + text;
            button.after(error);
        });
    }
}
