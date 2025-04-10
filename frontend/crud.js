const BASE_URL = "http://localhost:5000";


// Fungsi untuk menyimpan catatan (add note)


async function saveUser(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const text = document.getElementById("text").value;

    try {
        await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                category,
                text
            })
        });
        window.location.href = "home.html"; // buat arahin home setelah selesai submit
    } catch (error) {
        console.error("Error saving user:", error);
    }
}


// Fungsi untuk mengambil daftar catatan
async function getUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        let users = await response.json();

        // Ngurutin ID terbesar ke terkecil
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
                        <a href="edit.html?id=${user.id}" class="card-footer-item button is-small is-info">
                            <span class="icon"><i class="fas fa-pencil-alt mr-4"></i></span> Edit
                        </a>
                        <button onclick="deleteUser(${user.id})" class="card-footer-item button is-small is-danger">
                            <span class="icon"><i class="fas fa-trash mr-4"></i></span> Delete
                        </button>
                    </footer>
                </div>

            `;
            userList.appendChild(userCard);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Fungsi untuk menghapus catatan
async function deleteUser(id) {
    try {
        await fetch(`${BASE_URL}/users/${id}`, {
            method: "DELETE"
        });
        getUsers(); // Refresh daftar catatan setelah menghapus
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}


// Fungsi untuk mengambil data pengguna berdasarkan ID 
async function getUserById(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

// Fungsi untuk mengupdate catatan (edit note)
async function updateUser(event, id) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const text = document.getElementById("text").value;

    try {
        await fetch(`${BASE_URL}/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                category,
                text
            })
        });
        window.location.href = "home.html";
    } catch (error) {
        console.error("Error updating user:", error);
    }
}