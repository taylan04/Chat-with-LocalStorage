const nome = document.getElementById("nome")
const url = document.getElementById("url")
const erro = document.querySelector("p")

const perfisExistentes = JSON.parse(localStorage.getItem("listaDePerfis")) || []
let id = perfisExistentes.length > 0 ? Math.max(...perfisExistentes.map(perfil => perfil.id)) + 1 : 6;

function criar() {

     const usuarioExistente = perfisExistentes.find(perfil => perfil.name === nome.value || perfil.profilePictureUrl === url.value);

        if(usuarioExistente) {
            erro.textContent = "Usuário já cadastrado."
        } else if (nome.value === "" || url.value === "") {
             erro.textContent = "Preencha todos os dados."
        } else {
            const novoUsuario = new User (id++, nome.value, url.value);
            perfisExistentes.push(novoUsuario)
            localStorage.setItem("listaDePerfis", JSON.stringify(perfisExistentes));
            nome.value = ""
            url.value = ""
            window.location.href = "../usuarios/index.html"
        }
     
}