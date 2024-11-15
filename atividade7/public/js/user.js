document.getElementById("formCadastro").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "login.html";
});