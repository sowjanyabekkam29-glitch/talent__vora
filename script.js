<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="script.js"></script>
const db = window.supabase.createClient(
  "https://pnbgxzovrgujmrawridj.supabase.co",
  "sb_publishable_OuMqrtm2hvHs_Ae1sobSFA_EdWtWhU1"
);

// Register (use in register.html)
async function registerUser(name, email, password) {
  const { error } = await db.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });
  if (error) return alert(error.message);
  alert("Registered! Check your email to confirm, then log in.");
}

// Login (use in login.html)
async function loginUser(email, password) {
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) return alert(error.message);
  window.location.href = "dashboard.html";
    }
