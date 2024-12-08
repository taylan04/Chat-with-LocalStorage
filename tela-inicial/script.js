console.log("ok")

class User {
    constructor(id, name, profilePictureUrl, nameInitial) {
        this.id = id
        this.name = name
        this.profilePictureUrl = profilePictureUrl
        this.nameInitial = name.charAt(0).toUpperCase()

    }
    
    generateURL() {
        return `/chat.html?id=${this.id}`
    }
    
}

const listaDePerfis = JSON.parse(localStorage.getItem("listaDePerfis")) || []

function checarPerfis() {
    if(listaDePerfis.length > 0) {
        console.log("ok")
    } else {
        let taylan = new User (1, "Taylan", "https://i.pinimg.com/474x/23/b9/72/23b972cd7e341576d80cf8cea428f8c7.jpg")
        let richard = new User (2, "Richard", "https://i.pinimg.com/736x/29/f3/8c/29f38c71e8ecc9095e18e037874a276a.jpg")
        let mari = new User (3, "Mari", "https://i.pinimg.com/736x/13/ca/ba/13cabad66a3011ac9029e4e87db92cb6.jpg")
        let samuel = new User (4, "Samuel", null)
        let sofia = new User (5, "Sofia", null)
        listaDePerfis.push(taylan, richard, mari, samuel, sofia)
        localStorage.setItem("listaDePerfis", JSON.stringify(listaDePerfis))
    }

}

checarPerfis()