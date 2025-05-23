


// Register
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confPassword = document.getElementById("confPassword").value;

  if (password !== confPassword) {
    alert("Password dan konfirmasi password tidak cocok!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password, confPassword })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.msg || "Register gagal");

    alert("Register berhasil! Silakan login.");
    window.location.href = "login.html";
  } catch (error) {
    alert("Register gagal: " + error.message);
  }
});
