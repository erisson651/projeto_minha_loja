// ==========================================
// SCRIPT DA LOJA
// Responsável por enviar o produto
// selecionado para o carrinho.
// ==========================================

document.addEventListener("click", function (e) {

    // Verifica se clicou em um botão "Adicionar"
    if (!e.target.classList.contains("btn-add")) {
        return;
    }

    // Localiza o card do produto
    const card = e.target.closest(".card");

    // Pega os dados armazenados no card
    const nome = card.dataset.nome;
    const preco = card.dataset.preco;
    const imagem = card.dataset.imagem;

    // Verifica se todos os dados existem
    if (!nome || !preco || !imagem) {
        alert("Erro ao adicionar o produto ao carrinho.");
        return;
    }

    // Cria os parâmetros da URL
    const params = new URLSearchParams({
        nome: nome,
        preco: preco,
        imagem: imagem
    });

    // Redireciona para o carrinho
    window.location.href = "paginas/carrinho.html?" + params.toString();

});