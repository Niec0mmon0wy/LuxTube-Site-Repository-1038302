const SUPABASE_URL = "https://bpqastngkiffingtkioc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_-bj7VtoS8kHK7j-lldzu8g_ZEnvdkg2";

const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const { data, error } = await client.auth.signUp({

            email: email,
            password: password,

            options: {
                data: {
                    username: username
                }
            }

        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created successfully! Check your email to verify your account.");

        window.location.href = "login.html";

    } catch (err) {

        console.error(err);
        alert("Failed to connect to Supabase.");

    }

});
