
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Hapus token lama dulu biar aman
  localStorage.removeItem("accessToken");

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include", // supaya cookie refresh token ikut
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.msg || "Login gagal");

    localStorage.setItem("accessToken", data.accessToken);
    alert("Login berhasil!");
    window.location.href = "/pages/home.html";
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});
