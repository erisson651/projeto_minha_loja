// ================================
// LISTAR PRODUTOS
// ================================

const sectionCards = document.querySelector("#cards");

const listarProdutos = (lista = produtos) => {

    sectionCards.innerHTML = "";

    lista.forEach((elem) => {

        const divCard = document.createElement("div");
        divCard.classList.add("card");

        divCard.dataset.id = elem.id_produto;
        divCard.dataset.secao = elem.id_secao;

        // Imagem
        const imgProduto = document.createElement("img");
        imgProduto.src = elem.caminho_imagem;
        imgProduto.alt = elem.descricao_produto;

        // Nome
        const pNome = document.createElement("p");
        pNome.textContent = elem.descricao_produto;

        // Preço
        const h2Preco = document.createElement("h2");
        h2Preco.textContent = `R$ ${elem.valor_unitario
            .toFixed(2)
            .replace(".", ",")}`;

        // Botão
        const botao = document.createElement("button");
        botao.classList.add("btn-add");
        botao.textContent = "Adicionar";

        divCard.appendChild(imgProduto);
        divCard.appendChild(pNome);
        divCard.appendChild(h2Preco);
        divCard.appendChild(botao);

        sectionCards.appendChild(divCard);

    });

};

// ================================
// MENU DE CATEGORIAS
// ================================

const menuSecoes = () => {

    const mapa = new Map();

    produtos.forEach((produto) => {
        mapa.set(produto.id_secao, produto);
    });

    return Array.from(mapa.values());

};

// ================================
// CARREGAR MENU
// ================================

const carregaSecoes = () => {

    const ul = document.querySelector("#menu-secoes");

    ul.innerHTML = "";

    // Botão Todos
    const liTodos = document.createElement("li");

    const aTodos = document.createElement("a");
    aTodos.href = "#";
    aTodos.textContent = "Todos";

    aTodos.addEventListener("click", (e) => {
        e.preventDefault();
        listarProdutos(produtos);
    });

    liTodos.appendChild(aTodos);
    ul.appendChild(liTodos);

    // Categorias
    menuSecoes().forEach((secao) => {

        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = "#";
        a.classList.add("lnk-secao");
        a.textContent = secao.secao;

        a.addEventListener("click", (e) => {

            e.preventDefault();

            const filtrados = filtroProduto(secao.id_secao);

            listarProdutos(filtrados);

        });

        li.appendChild(a);
        ul.appendChild(li);

    });

};

// ================================
// FILTRO
// ================================

const filtroProduto = (idSecao) => {

    return produtos.filter(produto => produto.id_secao === idSecao);

};

// ================================
// INICIALIZAÇÃO
// ================================

listarProdutos();

carregaSecoes();