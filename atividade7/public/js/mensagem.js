document.addEventListener("DOMContentLoaded", () => {
    if (!auth.checkAuth()) {
        alert("Por favor, faça login para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    const mural = document.getElementById("mural");
    const mensagens = JSON.parse(localStorage.getItem("mensagens") || "[]");

    mensagens.forEach((mensagem, index) => {
        const div = document.createElement("div");
        div.textContent = mensagem.titulo;
        div.addEventListener("click", () => {
            localStorage.setItem("mensagemDetalhada", JSON.stringify(mensagem));
            window.location.href = "mensagem.html";
        });
        mural.appendChild(div);
    });
});