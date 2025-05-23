// const BASE_URL = "https://be-notes-17-t7-296685597625.us-central1.run.app";

document.addEventListener("DOMContentLoaded", () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    window.location.href = "/pages/login.html";
    return;
  }

  const navbarHTML = `
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">MayNOTES</a>
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbar-menu" class="navbar-menu">
          <div class="navbar-start navbar-center">
            <a class="navbar-item has-text-black" href="home.html">Home</a>
            <a class="navbar-item has-text-black" href="about_us.html">About Me</a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <button id="logoutBtn" class="button is-danger has-text-white">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <style>
      .navbar { background-color: rgb(2, 20, 38); }
      .navbar-item { color: rgb(249, 255, 191) !important; }
      .navbar-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
      }
      .navbar-end { margin-left: auto; }
      .navbar-burger { display: none; cursor: pointer; }
      @media screen and (max-width: 1024px) {
        .navbar-menu {
          display: none;
          flex-direction: column;
          align-items: center;
          background-color: rgb(2, 20, 38);
          width: 100%;
          position: absolute;
          top: 60px;
          left: 0;
          z-index: 1000;
          padding: 10px 0;
        }
        .navbar-menu.is-active { display: flex; }
        .navbar-burger { display: block; }
        .navbar-center {
          position: static;
          transform: none;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .navbar-end {
          margin-left: 0;
          margin-top: 10px;
        }
      }
    </style>
  `;

  const navbarContainer = document.getElementById("navbar-container");
  navbarContainer.innerHTML = navbarHTML;

  // Setelah DOM update, tambahkan event listener
  setTimeout(() => {
    const burger = navbarContainer.querySelector(".navbar-burger");
    const menu = navbarContainer.querySelector("#navbar-menu");

    burger.addEventListener("click", () => {
      menu.classList.toggle("is-active");
    });

    const logoutBtn = navbarContainer.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", async () => {
      try {
        await fetch(`https://be-notes-17-t7-296685597625.us-central1.run.app/logout`, {
          method: "DELETE",
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
      localStorage.removeItem("accessToken");
      window.location.href = "/pages/login.html";
    });
  }, 0); // ini yang bikin tombol bisa bekerja setelah HTML masuk ke DOM
});
