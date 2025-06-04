function getCookie(name,req) {
    // Permet de récupérer la valeur de notre cookie qui a le nom : name
    if (req.headers.cookie){
        const value = req.headers.cookie.split("; ").find(ele => ele.startsWith(name + "=")); 
        return value ? value.split("=")[1] : null;  // Si le cookie existe, retourne la valeur sinon retourne none
    }
    return null;
}

module.exports = { getCookie };