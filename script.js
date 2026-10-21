
function togglePassword() {
  const password = document.getElementById("password");

  if (!password) return;

  password.type =
    password.type === "password" ? "text" : "password";
}

function likeVideo(button) {
  const count = button.querySelector("span");

  if (!count) return;

  count.textContent = Number(count.textContent) + 1;
}

function logout() {
  localStorage.removeItem("tvUser");
}

// Demo navigation only; this does not securely verify a password.
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const accounts = JSON.parse(
      localStorage.getItem("tvAccounts") || "[]"
    );

    const account = accounts.find(
      item => item.email.toLowerCase() === email.toLowerCase()
        && item.password === password
    );

    if (!account) {
      alert("Account not found. Please register first.");
      return;
    }

    localStorage.setItem("tvUser", JSON.stringify({
      name: account.name,
      email: account.email
    }));

    window.location.href = "home.html";
  });
}
