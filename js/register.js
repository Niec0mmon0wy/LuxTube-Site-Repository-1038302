// LuxTube Register
// js/register.js

const SUPABASE_URL = "https://bpqastngkiffingtkioc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_-bj7VtoS8kHK7j-lldzu8g_ZEnvdkg2";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// ----------------------------
// Email Registration
// ----------------------------

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

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

        const { error } = await supabase.auth.signUp({

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

            alert(error.message);
            return;

        }

        alert(
            "Account created successfully!\n\nPlease verify your email before logging in."
        );

        window.location.href = "login.html";

    } catch (err) {

        console.error(err);

        alert("Failed to connect to Supabase.");

    }

});

// ----------------------------
// GitHub OAuth
// ----------------------------

const githubButton = document.getElementById("githubRegister");

githubButton.addEventListener("click", async () => {

    const { error } = await supabase.auth.signInWithOAuth({

        provider: "github",

        options: {

            redirectTo: "https://luxtubee.netlify.app/profile.html"

        }

    });

    if (error) {

        alert(error.message);

    }

});
