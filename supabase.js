
<!-- Add these script tags to each HTML page,
     before your own JavaScript files. -->

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase.js"></script>
<script src="script.js"></script>

/* supabase.js */

const SUPABASE_URL = "https://pnbgxzovrgujmrawridj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY ="sb_publishable_OuMqrtm2hvHs_Ae1sobSFA_EdWtWhU1"
  "YOUR_SUPABASE_PUBLISHABLE_KEY";

const client = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

window.supabaseClient = client;

