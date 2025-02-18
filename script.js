function toogleSidebar(){
    var sidebar = document.getElementById("mySidebar");
    var btn = document.querySelector(".toogle-btn")

    if (sidebar.style.width === "250px"){
        sidebar.style.width = "0";
        btn.innerHTML = "☰Abrir Menu";}
    else {
        sidebar.style.width="250px";
        btn.innerHTML = "❌ Fechar Menu";
    }
}
document.addEventListener("click", function (event) {
    if (sidebar.style.width === "250px" &&
        !sidebar.contains(event.target) &&
        !toggleBtn.contains(event.target)) {
        closeSidebar();
    }});
    document.addEventListener("DOMContentLoaded", function () {
        const sidebar = document.getElementById("mySidebar");
        const toggleBtn = document.querySelector(".toggle-btn");
    
        // Alterna a sidebar quando o botão for clicado
        toggleBtn.addEventListener("click", function () {
            if (sidebar.style.width === "250px") {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    
        // Função para abrir a sidebar
        function openSidebar() {
            sidebar.style.width = "250px";
            toggleBtn.innerHTML = "❌ Fechar Menu";
        }
    
        // Função para fechar a sidebar
        function closeSidebar() {
            sidebar.style.width = "0";
            toggleBtn.innerHTML = "☰ Abrir Menu";
        }
    
        // Fecha a sidebar se o usuário clicar fora dela
        document.addEventListener("click", function (event) {
            if (sidebar.style.width === "250px" &&
                !sidebar.contains(event.target) &&
                !toggleBtn.contains(event.target)) {
                closeSidebar();
            }
        });
    });