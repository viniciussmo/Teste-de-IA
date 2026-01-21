document.addEventListener("DOMContentLoaded", () => {
    const chat = document.getElementById("messages");
    const input = document.getElementById("input");

    function adicionarMensagem(texto, tipo) {
        const msg = document.createElement("div");
        msg.className = `msg ${tipo}`;
        msg.innerText = texto;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    }

    function mostrarPensando() {
        const pensando = document.createElement("div");
        pensando.className = "msg bot";
        pensando.id = "pensando";
        pensando.innerText = "Pensando...";
        chat.appendChild(pensando);
        chat.scrollTop = chat.scrollHeight;
    }

    function removerPensando() {
        const p = document.getElementById("pensando");
        if (p) p.remove();
    }

    async function enviar() {
        const texto = input.value.trim();
        if (!texto) return;

        adicionarMensagem(texto, "user");
        input.value = "";

        mostrarPensando();

        try {
            const resposta = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pergunta: texto })
            });

            const data = await resposta.json();
            removerPensando();
            adicionarMensagem(data.resposta, "bot");

        } catch (erro) {
            removerPensando();
            adicionarMensagem("Erro ao se comunicar com o servidor.", "bot");
            console.error(erro);
        }
    }

    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            enviar();
        }
    });
});
