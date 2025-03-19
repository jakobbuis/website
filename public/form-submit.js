document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        clear(form);
        const formData = new FormData(form);
        const target = form.getAttribute('action');
        const method = form.getAttribute('method');

        fetch(target, {
            method: method,
            body: formData,
        }).then((response) => {
            if (!response.ok) {
                showError(form, response);
            } else {
                success(form);
            }
        }).catch(() => {
            showError(form);
        });

    });
});

function clear(form) {
    form.querySelectorAll(':scope .form-message').forEach(m => m.remove());
}

function success(form) {
    var button = form.querySelectorAll(':scope button[type="submit"]')[0];
    var success = document.createElement("span");
    success.classList.add("form-message", "success");
    success.innerHTML = "✅ Verzonden";
    button.after(success);
}

function showError(form, response) {
    var button = form.querySelectorAll(':scope button[type="submit"]')[0];
    var error = document.createElement("span");
    error.classList.add("form-message", "failure");
    if (!response) {
        error.innerHTML = "❌ Niet verzonden: onbekende fout";
        button.after(error);
    } else {
        response.text().then(text => {
            error.innerHTML = "❌ Niet verzonden: " + text;
            button.after(error);
        });
    }
}
