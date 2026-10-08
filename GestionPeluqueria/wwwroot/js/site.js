// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", function () {

    const sidebarToggle = document.getElementById("sidebarToggle");

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", function () {
            document.getElementById("wrapper").classList.toggle("toggled");
        });
    }

    // Marcar la opción activa del menú
    const currentPath = window.location.pathname.toLowerCase();

    document.querySelectorAll(".sidebar-item").forEach(function (item) {

        const href = item.getAttribute("href");

        if (href) {
            const linkPath = href.replace("~", "").toLowerCase();

            if (currentPath === linkPath) {
                item.classList.add("active");
            }
        }

    });

});