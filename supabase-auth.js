// TalentVora - Supabase connection + auth helpers
const SUPABASE_URL = "https://pnbgxzovrgujmrawridj.supabase.co";
const SUPABASE_KEY = "sb_publishable_OuMqrtm2hvHs_Ae1sobSFA_EdWtWhU1"; // public key, safe in the browser

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function showMessage(text, isError = true) {
  const box = document.getElementById("message");
  if (!box) return alert(text);
  box.textContent = text;
  box.className = isError ? "msg error" : "msg ok";
}

function setBusy(button, busy, label) {
  if (!button) return;
  button.disabled = busy;
  button.textContent = busy ? "Please wait..." : label;
}

// ---------- REGISTER ----------
async function handleRegister(event) {
  event.preventDefault();
  const button = event.target.querySelector("button[type=submit]");
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (password.length < 6) return showMessage("Password must be at least 6 characters.");

  setBusy(button, true);
  const { error } = await db.auth.signUp({ email, password, options: { data: { name } } });
  setBusy(button, false, "Create account");

  if (error) return showMessage(error.message);
  showMessage("Account created. Redirecting to login...", false);
  setTimeout(() => (window.location.href = "login.html"), 1200);
}

// ---------- LOGIN ----------
async function handleLogin(event) {
  event.preventDefault();
  const button = event.target.querySelector("button[type=submit]");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  setBusy(button, true);
  const { error } = await db.auth.signInWithPassword({ email, password });
  setBusy(button, false, "Log in");

  if (error) return showMessage(error.message);
  window.location.href = "dashboard.html";
}

// ---------- LOGOUT ----------
async function handleLogout() {
  await db.auth.signOut();
  window.location.href = "login.html";
}

// ---------- PROTECT A PAGE: call requireLogin() on pages only for logged-in users ----------
async function requireLogin() {
  const { data } = await db.auth.getSession();
  if (!data.session) {
    window.location.href = "login.html";
    return null;
  }
  return data.session;
    }
