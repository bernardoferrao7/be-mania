// ========================================
// 🛒🔎 BÊ MANIA — CARRINHO + BUSCA
// ========================================

let carrinho = [];


// ========================================
// 🛒 ADICIONAR PRODUTO AO CARRINHO
// ========================================

const botoes = document.querySelectorAll(".adicionar");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const produto = botao.dataset.nome;

        const preco = parseFloat(
            botao.dataset.preco
        );


        const itemExistente = carrinho.find(function(item) {

            return item.nome === produto;

        });


        if (itemExistente) {

            itemExistente.quantidade++;

        } else {

            carrinho.push({

                nome: produto,

                preco: preco,

                quantidade: 1

            });

        }


        atualizarCarrinho();


        alert(
            "🛒 " +
            produto +
            " foi adicionado ao carrinho!"
        );

    });

});


// ========================================
// 🔄 ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho");

    const totalElemento =
        document.getElementById("total");


    lista.innerHTML = "";


    let total = 0;


    // Carrinho vazio
    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>Seu carrinho está vazio. 🛒</p>";

        totalElemento.textContent =
            "R$ 0,00";

        return;

    }


    // Mostrar produtos
    carrinho.forEach(function(item, indice) {

        const subtotal =
            item.preco * item.quantidade;


        total += subtotal;


        const div =
            document.createElement("div");


        div.className =
            "item-carrinho";


        div.innerHTML = `

            <div>

                <h3>
                    ${item.nome}
                </h3>

                <p>
                    R$ ${formatarPreco(item.preco)}
                    cada
                </p>

            </div>


            <div>

                <button
                    onclick="diminuir(${indice})">
                    ➖
                </button>


                <span>
                    ${item.quantidade}
                </span>


                <button
                    onclick="aumentar(${indice})">
                    ➕
                </button>

            </div>


            <strong>
                R$ ${formatarPreco(subtotal)}
            </strong>


            <button
                onclick="remover(${indice})">
                🗑️
            </button>

        `;


        lista.appendChild(div);

    });


    totalElemento.textContent =
        "R$ " + formatarPreco(total);

}


// ========================================
// 💰 FORMATAR PREÇO
// ========================================

function formatarPreco(valor) {

    return valor
        .toFixed(2)
        .replace(".", ",");

}


// ========================================
// ➕ AUMENTAR QUANTIDADE
// ========================================

function aumentar(indice) {

    carrinho[indice].quantidade++;

    atualizarCarrinho();

}


// ========================================
// ➖ DIMINUIR QUANTIDADE
// ========================================

function diminuir(indice) {

    carrinho[indice].quantidade--;


    if (carrinho[indice].quantidade <= 0) {

        carrinho.splice(indice, 1);

    }


    atualizarCarrinho();

}


// ========================================
// 🗑️ REMOVER PRODUTO
// ========================================

function remover(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();

}


// ========================================
// 💬 FINALIZAR PEDIDO PELO WHATSAPP
// ========================================

document
    .getElementById("finalizar")
    .addEventListener("click", function() {


        if (carrinho.length === 0) {

            alert(
                "Seu carrinho está vazio! 🛒"
            );

            return;

        }


        let mensagem =
            "Olá! Quero fazer um pedido na Bê Mania 😊\n\n";


        let total = 0;


        carrinho.forEach(function(item) {

            const subtotal =
                item.preco * item.quantidade;


            total += subtotal;


            mensagem +=
                "🛍️ " +
                item.nome +
                "\n";


            mensagem +=
                "Quantidade: " +
                item.quantidade +
                "\n";


            mensagem +=
                "Preço: R$ " +
                formatarPreco(item.preco) +
                "\n";


            mensagem +=
                "Subtotal: R$ " +
                formatarPreco(subtotal) +
                "\n\n";

        });


        mensagem +=
            "💰 Total: R$ " +
            formatarPreco(total);


        // 📱 COLOQUE AQUI O MESMO NÚMERO
        // DO WHATSAPP QUE VOCÊ JÁ CONFIGUROU

        const numero =
            "555591927947";


        const link =
            "https://wa.me/" +
            numero +
            "?text=" +
            encodeURIComponent(mensagem);


        window.open(
            link,
            "_blank"
        );

    });


// ========================================
// 🔎 BUSCA DE PRODUTOS
// ========================================

const campoBusca =
    document.getElementById("campo-busca");


if (campoBusca) {

    campoBusca.addEventListener(
        "input",
        function() {

            const texto =
                campoBusca.value
                    .toLowerCase()
                    .trim();


            const produtos =
                document.querySelectorAll(".produto");


            produtos.forEach(function(produto) {

                const nome =
                    produto
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();


                if (nome.includes(texto)) {

                    produto.style.display = "";

                } else {

                    produto.style.display = "none";

                }

            });

        }
    );

}


// ========================================
// 🚀 INICIAR CARRINHO
// ========================================

atualizarCarrinho();
