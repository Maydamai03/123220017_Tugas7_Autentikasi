// const BASE_URL = "http://localhost:5000"; 
const BASE_URL = "https://be-notes-17-t7-296685597625.us-central1.run.app"; 

// Ambil token dari localStorage
const token = localStorage.getItem('accessToken');

// Cek kalau tidak ada token → redirect ke login
if (!token && (window.location.pathname.includes('/pages/home.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/'))) {
    window.location.href = '/pages/login.html';
}

// // Fungsi untuk logout
// const logoutBtn = document.getElementById('logoutBtn');
// if (logoutBtn) {
//     logoutBtn.addEventListener('click', () => {
//         localStorage.removeItem('accessToken');
//         window.location.href = '/pages/login.html';
//     });
// }

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");

    // Ambil path sekarang, lalu arahin ke login.html di folder yang sama
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf("/") + 1);
    window.location.href = basePath + "login.html";
});


// Fungsi ambil semua catatan
async function getUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Token invalid");

        let users = await response.json();
        users.sort((a, b) => b.id - a.id); // urut dari terbaru

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
        console.error("Error:", error);
        localStorage.removeItem('accessToken');
        alert("Session habis. Silakan login lagi.");
        window.location.href = "/pages/login.html";
    }
}

// Tambah catatan
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

        if (!response.ok) throw new Error("Gagal menyimpan");

        window.location.href = "/pages/home.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal menyimpan catatan. Login ulang.");
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

        if (!response.ok) throw new Error("Gagal menghapus");

        getUsers();
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal hapus. Coba login ulang.");
    }
}

// Ambil data satu catatan
async function getUserById(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Token invalid");

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
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

        if (!response.ok) throw new Error("Gagal update");

        window.location.href = "/pages/home.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal update. Silakan login ulang.");
    }
}

// Auto-fetch data saat buka home
if (window.location.pathname.includes("/pages/home.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        getUsers();
    });
}

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
  } catch (e) {
    return null;
  }
}

if (window.location.pathname.includes("/pages/home.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    getUsers();

    const decoded = parseJwt(token);
    const username = decoded?.username || "User";

    const welcomeEl = document.getElementById("welcome-message");
    if (welcomeEl) {
      welcomeEl.textContent = `Selamat datang, ${username}!`;
    }
  });
}

