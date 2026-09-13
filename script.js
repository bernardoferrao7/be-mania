// ========================================
// 🛒🔎 BÊ MANIA — CARRINHO + BUSCA
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    let carrinho = [];


    // ========================================
    // 🛒 BOTÕES DE ADICIONAR
    // ========================================

    const botoes = document.querySelectorAll(".adicionar");

    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const produto = botao.getAttribute("data-nome");

            const preco = Number(
                botao.getAttribute("data-preco")
            );


            const itemExistente = carrinho.find(function (item) {

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


        if (carrinho.length === 0) {

            lista.innerHTML =
                "<p>Seu carrinho está vazio. 🛒</p>";

            totalElemento.textContent =
                "R$ 0,00";

            return;

        }


        carrinho.forEach(function (item, indice) {

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
                        type="button"
                        class="quantidade"
                        data-acao="diminuir"
                        data-indice="${indice}">

                        ➖

                    </button>


                    <span>
                        ${item.quantidade}
                    </span>


                    <button
                        type="button"
                        class="quantidade"
                        data-acao="aumentar"
                        data-indice="${indice}">

                        ➕

                    </button>

                </div>


                <strong>

                    R$ ${formatarPreco(subtotal)}

                </strong>


                <button
                    type="button"
                    class="remover"
                    data-indice="${indice}">

                    🗑️

                </button>

            `;


            lista.appendChild(div);

        });


        totalElemento.textContent =
            "R$ " + formatarPreco(total);


        // Botão diminuir
        document
            .querySelectorAll('[data-acao="diminuir"]')
            .forEach(function (botao) {

                botao.addEventListener("click", function () {

                    const indice =
                        Number(botao.dataset.indice);

                    diminuir(indice);

                });

            });


        // Botão aumentar
        document
            .querySelectorAll('[data-acao="aumentar"]')
            .forEach(function (botao) {

                botao.addEventListener("click", function () {

                    const indice =
                        Number(botao.dataset.indice);

                    aumentar(indice);

                });

            });


        // Botão remover
        document
            .querySelectorAll(".remover")
            .forEach(function (botao) {

                botao.addEventListener("click", function () {

                    const indice =
                        Number(botao.dataset.indice);

                    remover(indice);

                });

            });

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
    // ➕ AUMENTAR
    // ========================================

    function aumentar(indice) {

        carrinho[indice].quantidade++;

        atualizarCarrinho();

    }


    // ========================================
    // ➖ DIMINUIR
    // ========================================

    function diminuir(indice) {

        carrinho[indice].quantidade--;


        if (carrinho[indice].quantidade <= 0) {

            carrinho.splice(indice, 1);

        }


        atualizarCarrinho();

    }


    // ========================================
    // 🗑️ REMOVER
    // ========================================

    function remover(indice) {

        carrinho.splice(indice, 1);

        atualizarCarrinho();

    }


    // ========================================
    // 🔎 BUSCA
    // ========================================

    const campoBusca =
        document.getElementById("campo-busca");


    if (campoBusca) {

        campoBusca.addEventListener(
            "input",
            function () {

                const texto =
                    campoBusca.value
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .trim();


                const produtos =
                    document.querySelectorAll(".produto");


                produtos.forEach(function (produto) {

                    const nome =
                        produto
                            .querySelector("h3")
                            .textContent
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");


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
    // 💬 FINALIZAR PEDIDO
    // ========================================

    const finalizar =
        document.getElementById("finalizar");


    finalizar.addEventListener(
        "click",
        function () {

            if (carrinho.length === 0) {

                alert(
                    "Seu carrinho está vazio! 🛒"
                );

                return;

            }


            let mensagem =
                "Olá! Quero fazer um pedido na Bê Mania 😊\n\n";


            let total = 0;


            carrinho.forEach(function (item) {

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


            // ========================================
            // 📱 WHATSAPP DA BÊ MANIA
            // ========================================

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

        }
    );


    // ========================================
    // 🚀 INICIAR
    // ========================================

    atualizarCarrinho();

});
