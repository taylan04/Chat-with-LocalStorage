const perfis = JSON.parse(localStorage.getItem("listaDePerfis")) || []
const sectionPerfis = document.querySelector("section")


function exibirPerfis() {
    perfis.forEach((perfil) => {
        const div = document.createElement("div")
        div.innerHTML = `
            <img src="${perfil.profilePictureUrl}" alt="foto-de-perfil" title="foto-de-perfil">
            <i class="fa-solid fa-trash fa-lg" style="color: #f2f2f2;"></i>
            <h3>${perfil.nameInitial}</h3>
            <h2>${perfil.name}</h2>
          `;
        div.classList.add("perfil")
        sectionPerfis.appendChild(div)
    
        const img = div.querySelector("img")
        const h3 = div.querySelector("h3")
        const i = div.querySelector("i")
    
        if(perfil.profilePictureUrl === null) {
           img.style.display = "none"
        } else {
            h3.style.display = "none"
        }

        i.addEventListener("click", function() {
            const indicePerfil = perfis.findIndex(p => p.id === perfil.id);
            if (indicePerfil !== -1) {
                perfis.splice(indicePerfil, 1);
                localStorage.setItem("listaDePerfis", JSON.stringify(perfis));
                div.remove();
            }
        })

        div.addEventListener("click", function() {
            window.location.href = `../chat/chat.html?id=${perfil.id}`
        })
    });
}

exibirPerfis()