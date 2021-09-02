document.addEventListener("DOMContentLoaded", criarBotoes);
function adicionarBotao(texto, tamanho) {
    botao = document.createElement("button");
    botao.innerHTML = texto;
    botao.addEventListener("click", function () {
        mudaTamanho(tamanho)
    });
    return botao;
}
const tamanhos = [
    ["inicio", "200%"],
    ["+", "250%"],
    ["-", "150%"]
    
]
function criarBotoes() {
    div = document.createElement("div");
    tamanhos.forEach(function(item) {
        const [texto, tamanho] = item
        botao = adicionarBotao(texto, tamanho);
        div.appendChild(botao);
        div.appendChild(document.createTextNode(" "));
    })
    document.body.prepend(div);
}
function mudaTamanho(tamanho) {
    h1 = document.querySelector("h1");
    h1.style.fontSize = tamanho;
}
        