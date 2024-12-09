class Message {
    constructor(name, photoUser, content, authorld, createdAt = new Date()) {
        this.name = name;
        this.photoUser = photoUser
        this.content = content;
        this.authorld = authorld;
        this.createdAt = createdAt;
    }
}

const nomeDoUsuario = document.querySelector("h2")
const fotoDoUsuario = document.getElementById("fotoDoUsuario")
const letraDoUsuario = document.getElementById("inicialDoUsuario")
const perfis = JSON.parse(localStorage.getItem("listaDePerfis")) || []

function encontrarUsuario() {
    let url = window.location.search
    console.log(url)
    const params = new URLSearchParams(url)
    const usuario = params.get('id')
    console.log(usuario)

    if(!usuario) {
        window.location.href = "../tela-inicial/index.html"
        return
    }

    const verificando = perfis.find((perfil) => String(perfil.id) === String(usuario)); 
    nomeDoUsuario.textContent = verificando.name
    fotoDoUsuario.src = verificando.profilePictureUrl
    if(verificando.profilePictureUrl === null) {
        fotoDoUsuario.style.display = "none"
        letraDoUsuario.style.display = "flex"
        letraDoUsuario.textContent = verificando.nameInitial
    }

    if (verificando) {
        console.log("Perfil selecionado:", verificando.name, "| dados:", verificando);
    }
}

encontrarUsuario()

const input = document.querySelector("input")
const mensagens = JSON.parse(localStorage.getItem("mensagens")) || []

input.addEventListener("keydown", function(event){
    let url2 = window.location.search
    const params2 = new URLSearchParams(url2)
    const usuario2 = params2.get('id')
    const verificando = perfis.find((perfil) => String(perfil.id) === String(usuario2));
     if(event.code === "Enter" || event.code === "NumpadEnter") {
        let novaMensagem = new Message (
            verificando.name,
            verificando.profilePictureUrl,
            input.value,
            usuario2
        )
        mensagens.push(novaMensagem)
        localStorage.setItem("mensagens", JSON.stringify(mensagens))
        input.value = ""
     }
})

const mensagensSalvas = JSON.parse(localStorage.getItem("mensagens")) || []
const chat = document.querySelector(".mensagens")

mensagensSalvas.forEach(mensagem => {
    let url3 = window.location.search
    const params3 = new URLSearchParams(url3)
    const usuario3 = params3.get('id')

    const caixaDaMensagem = document.createElement("div")
    if (usuario3 === mensagem.authorld) {
        caixaDaMensagem.innerHTML = `<div class="minhaMensagem">
                <h4>${mensagem.name}</h4>
                <img src="${mensagem.photoUser}" alt="perfil" title="perfil">
                <p>${mensagem.content}</p>
                <div class="data">${mensagem.createdAt}</div>
            </div>`
        chat.appendChild(caixaDaMensagem)

    } else {
        caixaDaMensagem.innerHTML = `<div class="mensagem">
                <h4>${mensagem.name}</h4>
                <img src="${mensagem.photoUser}" alt="perfil" title="perfil">
                <p>${mensagem.content}</p>
                <div class="data">${mensagem.createdAt}</div>
            </div>`
        chat.appendChild(caixaDaMensagem)
    }
});
