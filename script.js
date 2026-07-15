// script.js
// Fica na página do carrinho (paginas/carrinho.html).
// Lê o produto que veio pela URL (nome, preço, imagem)
// e monta a linha da tabela.

document.addEventListener("DOMContentLoaded", function () {

    const listaCarrinho = document.getElementById("listaCarrinho");
    const carrinhoVazio = document.getElementById("carrinhoVazio");
    const subtotalEl = document.getElementById("subtotal");
    const freteEl = document.getElementById("frete");
    const totalEl = document.getElementById("total");

    function formatarMoeda(valor) {
        return "R$ " + valor.toFixed(2).replace(".", ",");
    }

    function atualizarResumo() {
        let subtotal = 0;

        document.querySelectorAll("#listaCarrinho tr").forEach(function (linha) {

            const preco = parseFloat(linha.dataset.preco);
            const quantidade = parseInt(linha.querySelector(".input-qtd").value, 10) || 0;

            const totalLinha = preco * quantidade;

            linha.querySelector(".total-linha").textContent = formatarMoeda(totalLinha);

            subtotal += totalLinha;

        });

        // Cálculo do frete
        let frete = 0;

        if (subtotal > 0 && subtotal <= 300) {
            frete = 19.90;
        } else if (subtotal <= 500) {
            frete = 12.90;
        } else if (subtotal <= 759) {
            frete = 6.90;
        } else if (subtotal >= 760) {
            frete = 0;
        }

        subtotalEl.textContent = formatarMoeda(subtotal);
        freteEl.textContent = subtotal >= 760 ? "Grátis" : formatarMoeda(frete);
        totalEl.textContent = formatarMoeda(subtotal + frete);

        carrinhoVazio.style.display = subtotal > 0 ? "none" : "block";
    }

    function criarLinhaProduto(nome, preco, imagem) {

        const linha = document.createElement("tr");

        linha.dataset.preco = preco;

        linha.innerHTML = `
            <td class="produto-linha">
                <img src="../${imagem}" alt="${nome}">
                <span>${nome}</span>
            </td>

            <td>${formatarMoeda(preco)}</td>

            <td>
                <input type="number" class="input-qtd" value="1" min="1">
            </td>

            <td class="total-linha">
                ${formatarMoeda(preco)}
            </td>

            <td>
                <button class="btn-remover" title="Remover">&times;</button>
            </td>
        `;

        listaCarrinho.appendChild(linha);

        linha.querySelector(".input-qtd").addEventListener("input", atualizarResumo);

        linha.querySelector(".btn-remover").addEventListener("click", function () {
            linha.remove();
            atualizarResumo();
        });
    }

    // Lê os dados enviados pela URL
    const params = new URLSearchParams(window.location.search);

    const nome = params.get("nome");
    const preco = parseFloat(params.get("preco"));
    const imagem = params.get("imagem");

    if (nome && !isNaN(preco) && imagem) {
        criarLinhaProduto(nome, preco, imagem);
    }

    atualizarResumo();

    // Botão Finalizar Compra
    document.querySelector(".finalizar").addEventListener("click", function () {

        if (document.querySelectorAll("#listaCarrinho tr").length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        alert("Compra finalizada! Obrigado por comprar na APEX SPORT.");

    });

});