// LuxTube Register
// js/register.js

const SUPABASE_URL = "https://bpqastngkiffingtkioc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_-bj7VtoS8kHK7j-lldzu8g_ZEnvdkg2";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username.length < 3) {
        alert("Username must contain at least 3 characters.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const { data, error } = await supabase.auth.signUp({

            email: email,

            password: password,

            options: {

                emailRedirectTo: "https://luxtubee.netlify.app/login.html",

                data: {

                    username: username

                }

            }

        });

        if (error) {

            alert("Registration failed:\n\n" + error.message);
            return;

        }

        alert(
`🎉 Welcome to LuxTube!

Your account has been created.

A verification email has been sent to:

${email}

Please verify your email before logging in.`
        );

        window.location.href = "login.html";

    } catch (err) {

        console.error(err);

        alert("Failed to connect to Supabase.\n\nCheck your Project URL and Publishable Key.");

    }

});
