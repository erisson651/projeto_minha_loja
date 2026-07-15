// ==========================================
// SCRIPT DA LOJA
// Responsável por enviar o produto
// selecionado para o carrinho.
//
// Antes, cada clique em "Adicionar" mandava
// o produto pela URL e substituía o que já
// estava no carrinho. Agora o carrinho é
// guardado no localStorage, então os produtos
// se somam em vez de se apagarem.
// ==========================================

const CHAVE_CARRINHO = "apexSportCarrinho";

function lerCarrinho() {
    const dados = localStorage.getItem(CHAVE_CARRINHO);
    return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

document.addEventListener("click", function (e) {

    // Verifica se clicou em um botão "Adicionar"
    if (!e.target.classList.contains("btn-add")) {
        return;
    }

    // Localiza o card do produto
    const card = e.target.closest(".card");

    // Pega os dados armazenados no card
    const id = card.dataset.id;
    const nome = card.dataset.nome;
    const preco = card.dataset.preco;
    const imagem = card.dataset.imagem;

    // Verifica se todos os dados existem
    if (!id || !nome || !preco || !imagem) {
        alert("Erro ao adicionar o produto ao carrinho.");
        return;
    }

    const carrinho = lerCarrinho();

    // Se o produto já está no carrinho, só aumenta a quantidade
    const itemExistente = carrinho.find((item) => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: parseFloat(preco),
            imagem: imagem,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);

    // Redireciona para o carrinho
    const emPagina = window.location.pathname.includes("/paginas/");
    window.location.href = (emPagina ? "" : "paginas/") + "carrinho.html";

});