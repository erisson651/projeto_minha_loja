// script_loja.js
// Fica na página inicial (index.html).
// Quando o cliente clica em "Adicionar", pega os dados do produto
// direto para o carrinho, já com esse produto na URL.

document.addEventListener("DOMContentLoaded", function () {

    const botoesAdicionar = document.querySelectorAll(".btn-add");

    botoesAdicionar.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const card = botao.closest(".card");

            const nome = card.dataset.nome;
            const preco = card.dataset.preco;
            const imagem = card.dataset.imagem;

            // Monta a URL do carrinho com os dados do produto
            const params = new URLSearchParams({
                nome: nome,
                preco: preco,
                imagem: imagem
            });

            window.location.href = "paginas/carrinho.html?" + params.toString();

        });

    });

});