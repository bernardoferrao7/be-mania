// ========================================
// 🛒 CARRINHO DA BÊ MANIA
// ========================================

// Lista onde vamos guardar os produtos
let carrinho = [];


// ========================================
// BOTÕES "ADICIONAR AO CARRINHO"
// ========================================

const botoes = document.querySelectorAll(".adicionar");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Pega o nome do produto
        const produto =
            botao.parentElement.querySelector("h3").textContent;

        // Pega o preço
        const textoPreco =
            botao.parentElement.querySelector("strong").textContent;

        // Transforma "R$ 10,00" em número
        const preco =
            parseFloat(
                textoPreco
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
            );


        // Verifica se o produto já está no carrinho
        const itemExistente =
            carrinho.find(function(item) {

                return item.nome === produto;

            });


        if (itemExistente) {

            // Se já estiver, aumenta a quantidade
            itemExistente.quantidade++;

        } else {

            // Se não estiver, adiciona
            carrinho.push({

                nome: produto,

                preco: preco,

                quantidade: 1

            });

        }


        // Atualiza o carrinho
        atualizarCarrinho();

    });

});


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho");

    const totalElemento =
        document.getElementById("total");


    // Limpa a lista
    lista.innerHTML = "";


    let total = 0;


    // Se estiver vazio
    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>Seu carrinho está vazio. 🛒</p>";

        totalElemento.textContent =
            "R$ 0,00";

        return;

    }


    // Percorre todos os produtos
    carrinho.forEach(function(item, indice) {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;


        // Cria o elemento do produto
        const div =
            document.createElement("div");

        div.className =
            "item-carrinho";


        div.innerHTML = `

            <h3>
                ${item.nome}
            </h3>

            <p>
                R$ ${item.preco
                    .toFixed(2)
                    .replace(".", ",")}
            </p>


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


            <button
                onclick="remover(${indice})">
                🗑️
            </button>

        `;


        lista.appendChild(div);

    });


    // Mostra o total
    totalElemento.textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");

}


// ========================================
// AUMENTAR QUANTIDADE
// ========================================

function aumentar(indice) {

    carrinho[indice].quantidade++;

    atualizarCarrinho();

}


// ========================================
// DIMINUIR QUANTIDADE
// ========================================

function diminuir(indice) {

    carrinho[indice].quantidade--;


    // Se chegar a zero,
    // remove o produto
    if (carrinho[indice].quantidade <= 0) {

        carrinho.splice(indice, 1);

    }


    atualizarCarrinho();

}


// ========================================
// REMOVER PRODUTO
// ========================================

function remover(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();

}


// ========================================
// ENVIAR PEDIDO PELO WHATSAPP
// ========================================

document
    .getElementById("finalizar")
    .addEventListener("click", function() {


        // Verifica se o carrinho está vazio
        if (carrinho.length === 0) {

            alert(
                "Seu carrinho está vazio! 🛒"
            );

            return;

        }


        // Começo da mensagem
        let mensagem =
            "Olá! Quero fazer um pedido na Bê Mania 😊\n\n";


        let total = 0;


        // Adiciona cada produto à mensagem
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
                "Subtotal: R$ " +
                subtotal
                    .toFixed(2)
                    .replace(".", ",") +
                "\n\n";

        });


        // Adiciona o total
        mensagem +=
            "💰 Total: R$ " +
            total
                .toFixed(2)
                .replace(".", ",");


        // ====================================
        // 📱 NÚMERO DO WHATSAPP
        // ====================================

        const numero =
            "555591927947";


        // Cria o link
        const link =
            "https://wa.me/" +
            numero +
            "?text=" +
            encodeURIComponent(mensagem);


        // Abre o WhatsApp
        window.open(
            link,
            "_blank"
        );

    });