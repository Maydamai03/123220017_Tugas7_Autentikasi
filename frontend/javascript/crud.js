// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://be-notes-17-t7-296685597625.us-central1.run.app"; 

// Ambil token dari localStorage
const token = localStorage.getItem('accessToken');

// Fungsi cek token valid atau tidak
function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return payload.exp && payload.exp > now;
  } catch {
    return false;
  }
}

// Kalau token gak valid dan sedang di halaman home, redirect ke login
if (!isTokenValid(token) && (window.location.pathname.includes('/pages/home.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/'))) {
    localStorage.removeItem('accessToken');
    window.location.href = '/pages/login.html';
}

// Fungsi logout jadinya di navbar.js, panggil API backend logout, hapus token, lalu redirect login
// const logoutBtn = document.getElementById('logoutBtn');
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', async () => {
//     try {
//       await fetch(`${BASE_URL}/logout`, {
//         method: 'DELETE',
//         credentials: 'include',  // penting supaya cookie refresh token ikut kehapus
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//     localStorage.removeItem('accessToken');
//     window.location.href = '/pages/login.html';
//   });
// }

// Fungsi ambil semua catatan
async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Token invalid atau gagal mengambil data");

    let users = await response.json();
    users.sort((a, b) => b.id - a.id);

    const userList = document.getElementById("user-list");
    userList.innerHTML = "";

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.className = "column is-one-third";
      userCard.innerHTML = `
        <div class="card">
          <div class="card-content">
            <p class="title mb-5">${user.title}</p> 
            <p class="subtitle" style="color: orange;">Kategori : ${user.category}</p>
            <p>Catatan :</p>
            <p>${user.text}</p>
          </div>
          <footer class="card-footer">
            <a href="edit.html?id=${user.id}" class="card-footer-item button is-small is-info">Edit</a>
            <button onclick="deleteUser(${user.id})" class="card-footer-item button is-small is-danger">Delete</button>
          </footer>
        </div>
      `;
      userList.appendChild(userCard);
    });
  } catch (error) {
    alert("Session habis atau gagal mengambil data, silakan login ulang.");
    localStorage.removeItem('accessToken');
    window.location.href = "/pages/login.html";
  }
}

// Tambah catatan baru
async function saveUser(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const text = document.getElementById("text").value;

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, category, text })
    });

    if (!response.ok) throw new Error("Gagal menyimpan catatan");

    window.location.href = "/pages/home.html";
  } catch (error) {
    alert("Gagal menyimpan catatan. Silakan login ulang.");
  }
}

// Hapus catatan
async function deleteUser(id) {
  if (!confirm("Yakin ingin menghapus catatan ini?")) return;

  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Gagal menghapus catatan");

    getUsers();
  } catch (error) {
    alert("Gagal menghapus catatan. Silakan login ulang.");
  }
}

// Ambil data satu catatan by id
async function getUserById(id) {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Gagal mengambil data catatan");

    return await response.json();
  } catch (error) {
    alert("Gagal mengambil data catatan. Silakan login ulang.");
    window.location.href = "/pages/login.html";
  }
}

// Update catatan
async function updateUser(event, id) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const text = document.getElementById("text").value;

  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, category, text })
    });

    if (!response.ok) throw new Error("Gagal update catatan");

    window.location.href = "/pages/home.html";
  } catch (error) {
    alert("Gagal update catatan. Silakan login ulang.");
  }
}

// Fungsi untuk decode JWT dan ambil username
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Tampilkan welcome message berdasarkan username di token
function showWelcomeMessage() {
  const welcomeEl = document.getElementById("welcome-message");
  if (!welcomeEl) return;

  const decoded = parseJwt(token);
  const username = decoded?.username || "User";
  welcomeEl.textContent = `Selamat datang, ${username}!`;
}

// Saat halaman home selesai dimuat, jalankan
if (window.location.pathname.includes("/pages/home.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    showWelcomeMessage();
    getUsers();
  });
}
