// script.js
// Fica na página do carrinho (paginas/carrinho.html).
// Lê os produtos guardados no localStorage (adicionados pelo
// script_loja.js) e monta a tabela do carrinho.

const CHAVE_CARRINHO = "apexSportCarrinho";

function lerCarrinho() {
    const dados = localStorage.getItem(CHAVE_CARRINHO);
    return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

document.addEventListener("DOMContentLoaded", function () {

    const listaCarrinho = document.getElementById("listaCarrinho");
    const carrinhoVazio = document.getElementById("carrinhoVazio");
    const subtotalEl = document.getElementById("subtotal");
    const freteEl = document.getElementById("frete");
    const totalEl = document.getElementById("total");

    function formatarMoeda(valor) {
        return "R$ " + valor.toFixed(2).replace(".", ",");
    }

    function calcularFrete(subtotal) {
        if (subtotal <= 0) return 0;
        if (subtotal <= 300) return 19.90;
        if (subtotal <= 500) return 12.90;
        if (subtotal <= 759) return 6.90;
        return 0; // subtotal >= 760
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

        const frete = calcularFrete(subtotal);

        subtotalEl.textContent = formatarMoeda(subtotal);
        freteEl.textContent = subtotal >= 760 ? "Grátis" : formatarMoeda(frete);
        totalEl.textContent = formatarMoeda(subtotal + frete);

        carrinhoVazio.style.display = subtotal > 0 ? "none" : "block";
    }

    // Atualiza a quantidade de um item no localStorage
    function atualizarQuantidadeSalva(id, quantidade) {
        const carrinho = lerCarrinho();
        const item = carrinho.find((p) => p.id === id);

        if (item) {
            item.quantidade = quantidade;
            salvarCarrinho(carrinho);
        }
    }

    // Remove um item do localStorage
    function removerItemSalvo(id) {
        const carrinho = lerCarrinho().filter((p) => p.id !== id);
        salvarCarrinho(carrinho);
    }

    function criarLinhaProduto(item) {

        const linha = document.createElement("tr");

        linha.dataset.id = item.id;
        linha.dataset.preco = item.preco;

        linha.innerHTML = `
            <td class="produto-linha">
                <img src="../${item.imagem}" alt="${item.nome}">
                <span>${item.nome}</span>
            </td>

            <td>${formatarMoeda(item.preco)}</td>

            <td>
                <input type="number" class="input-qtd" value="${item.quantidade}" min="1">
            </td>

            <td class="total-linha">
                ${formatarMoeda(item.preco * item.quantidade)}
            </td>

            <td>
                <button class="btn-remover" title="Remover">&times;</button>
            </td>
        `;

        listaCarrinho.appendChild(linha);

        const inputQtd = linha.querySelector(".input-qtd");

        inputQtd.addEventListener("input", function () {
            let quantidade = parseInt(inputQtd.value, 10);

            if (!quantidade || quantidade < 1) {
                quantidade = 1;
                inputQtd.value = 1;
            }

            atualizarQuantidadeSalva(item.id, quantidade);
            atualizarResumo();
        });

        linha.querySelector(".btn-remover").addEventListener("click", function () {
            removerItemSalvo(item.id);
            linha.remove();
            atualizarResumo();
        });
    }

    function renderizarCarrinho() {
        listaCarrinho.innerHTML = "";

        const carrinho = lerCarrinho();

        carrinho.forEach(criarLinhaProduto);

        atualizarResumo();
    }

    renderizarCarrinho();

    // Botão Finalizar Compra
    document.querySelector(".finalizar").addEventListener("click", function () {

        if (document.querySelectorAll("#listaCarrinho tr").length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        alert("Compra finalizada! Obrigado por comprar na APEX SPORT.");

        // Esvazia o carrinho depois da compra
        salvarCarrinho([]);
        renderizarCarrinho();
    });

    // Botão Calcular Frete pelo CEP
    document.getElementById("btnCep").addEventListener("click", async function () {

        const cepInput = document.getElementById("cep");
        const resultadoCep = document.getElementById("resultadoCep");

        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            resultadoCep.textContent = "Digite um CEP válido (8 números).";
            return;
        }

        resultadoCep.textContent = "Consultando CEP...";

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = await resposta.json();

            if (dados.erro) {
                resultadoCep.textContent = "CEP não encontrado.";
                return;
            }

            resultadoCep.textContent =
                `Entrega para ${dados.localidade}/${dados.uf} - ${dados.logradouro || "endereço"}. ` +
                `O valor do frete é calculado pelo subtotal da compra, exibido no resumo acima.`;

        } catch (erro) {
            resultadoCep.textContent = "Não foi possível consultar o CEP agora. Tente novamente.";
        }
    });

});