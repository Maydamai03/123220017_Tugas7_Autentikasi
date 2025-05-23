// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://be-notes-17-t7-296685597625.us-central1.run.app"; 

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include",   // penting kalau server kirim cookie
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.msg || "Login gagal");

    localStorage.setItem("accessToken", data.accessToken); // simpan token kalau perlu
    alert("Login berhasil!");
    window.location.href = "../pages/home.html";  // arahkan ke halaman home
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});

