const SUPABASE_URL = "https://pnbgxzovrgujmrawridj.supabase.co";
const SUPABASE_KEY = "sb_publishable_OuMqrtm2hvHs_Ae1sobSFA_EdWtWhU1";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function showMessage(text, isError = true) {
  const box = document.getElementById("message");
  if (box) {
    box.textContent = text;
    box.style.color = isError ? "red" : "green";
  } else {
    alert(text);
  }
}

// ---------- REGISTER ----------
async function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (password.length < 6) {
    return showMessage("Password must be at least 6 characters.");
  }

  const { error } = await db.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });

  if (error) return showMessage(error.message);

  showMessage("Registered successfully! Redirecting to login...", false);
  setTimeout(() => (window.location.href = "login.html"), 1500);
}

// ---------- LOGIN ----------
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { error } = await db.auth.signInWithPassword({ email, password });

  if (error) return showMessage(error.message);

  window.location.href = "dashboard.html";
}

// ---------- LOGOUT ----------
async function handleLogout() {
  await db.auth.signOut();
  window.location.href = "login.html";
}

// ---------- PROTECT PAGES (use on dashboard, upload, etc.) ----------
async function requireLogin() {
  const { data } = await db.auth.getSession();
  if (!data.session) window.location.href = "login.html";
  return data.session;
    }
