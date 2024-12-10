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

function enviandoMensagem() {
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || []
    let url2 = window.location.search
    const params2 = new URLSearchParams(url2)
    const usuario2 = params2.get('id')
    const verificando = perfis.find((perfil) => String(perfil.id) === String(usuario2));
    
    let novaMensagem = new Message (
        verificando.name,
        verificando.profilePictureUrl,
        input.value,
        usuario2
    )
    mensagens.push(novaMensagem)
    localStorage.setItem("mensagens", JSON.stringify(mensagens))
    exibindoMensagens();
    input.value = ""
}

input.addEventListener("keydown", function(event){
     if(event.code === "Enter" || event.code === "NumpadEnter") {
        enviandoMensagem()
     }
})

const chat = document.querySelector(".mensagens")

function exibindoMensagens() {
    
    const mensagensSalvas = JSON.parse(localStorage.getItem("mensagens")) || []
    chat.innerHTML = "";

    mensagensSalvas.forEach(mensagem => {
        let url3 = window.location.search
        const params3 = new URLSearchParams(url3)
        const usuario3 = params3.get('id')
    
        const caixaDaMensagem = document.createElement("div")

        if (usuario3 === mensagem.authorld) {
            caixaDaMensagem.innerHTML = `
                    <h4>${mensagem.name}</h4>
                    <img src="${mensagem.photoUser}" alt="perfil" title="perfil">
                    <h2>${mensagem.name.charAt(0).toUpperCase()}</h2>
                    <p>${mensagem.content}</p>
                    <div class="data">${new Date(mensagem.createdAt).toLocaleString()}</div>`
                    caixaDaMensagem.classList.add("minhaMensagem")
                    chat.appendChild(caixaDaMensagem)
        } else {
            caixaDaMensagem.innerHTML = `
                    <h4>${mensagem.name}</h4>
                    <img src="${mensagem.photoUser}" alt="perfil" title="perfil">
                    <h2>${mensagem.name.charAt(0).toUpperCase()}</h2>
                    <p>${mensagem.content}</p>
                    <div class="data">${new Date(mensagem.createdAt).toLocaleString()}</div>`
                    caixaDaMensagem.classList.add("mensagem")
                    chat.appendChild(caixaDaMensagem)
        }

        const fotoDaImagem = caixaDaMensagem.querySelector("img")
        const InicialDaMensagem = caixaDaMensagem.querySelector("h2")
        if(mensagem.photoUser === null) {
            fotoDaImagem.style.display = "none"
            InicialDaMensagem.style.display = "flex"
        }
    });
}

document.addEventListener("DOMContentLoaded", exibindoMensagens)

window.addEventListener("storage", exibindoMensagens)
