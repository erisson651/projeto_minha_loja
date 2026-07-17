const cep = document.getElementById("cep");

cep.addEventListener("blur", buscarCep);

function buscarCep() {

    const valorCep = cep.value.replace(/\D/g, "");

    if (valorCep.length !== 8) {
        alert("CEP inválido!");
        return;
    }

    fetch(`https://viacep.com.br/ws/${valorCep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {

            if (dados.erro) {
                alert("CEP não encontrado.");
                return;
            }

            document.getElementById("logradouro").value = dados.logradouro;
document.getElementById("bairro").value = dados.bairro;
document.getElementById("cidade").value = dados.localidade;
document.getElementById("estado").value = dados.uf;
        })
        .catch(() => {
            alert("Erro ao buscar o CEP.");
        });

}