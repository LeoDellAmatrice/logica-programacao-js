export function AppController(editor, desafios, feedback, output) {

    function carregarDesafio() {
        const dados = desafios.getDados();

        document.getElementById("desafio-number").textContent =
            `Desafio ${desafios.getAtual() + 1}`;

        document.getElementById("titulo").textContent = dados.titulo;
        document.getElementById("instrucoes").textContent = dados.instrucoes;

        feedback.clear();
        output.clear();
        editor.setValue("// Escreva seu código aqui\n");
    }

    function extrairLinhaColuna(erro) {
        const match = erro.stack?.match(/<anonymous>:(\d+):(\d+)/);

        if (!match) return null;

        return {
            linha: Number(match[1]) - 2,
            coluna: Number(match[2])
        };
    }

    function executar() {
        const code = editor.getValue();
        editor.limparDestaques();

        // 1️⃣ Executar o código SEMPRE
        try {
            const fakeConsole = {
                _output: "",
                log: (...args) => {
                    fakeConsole._output += args.join(" ") + "\n";
                }
            };

            new Function("console", code)(fakeConsole);

            output.set(fakeConsole._output || "Código rodou sem saída.");
        } catch (e) {
            const info = extrairLinhaColuna(e);

            if (info) {
                editor.destacarLinha(info.linha);
                output.set(
                    `Erro na linha ${info.linha}, coluna ${info.coluna}:\n${e.message}`
                );
            } else {
                output.set("Erro:\n" + e.message);
            }
        }

        // 2️⃣ Validar SEPARADAMENTE
        try {
            const valido = desafios.validar(code);

            if (valido) {
                desafios.avancar();
                feedback.show("Parabéns! Você completou o desafio.", "success");
            } else {
                feedback.show("Ainda não está certo. Tente novamente.", "error");
            }
        } catch (e) {
            feedback.show("Erro na validação: " + e.message, "error");
        }
    }

    function proximoDesafio() {
        if (!desafios.podeAvancar()) {
            feedback.show(
                `Complete o desafio ${desafios.getAtual() + 1} antes de continuar`,
                "error"
            );
            return;
        }

        desafios.proximo();
        carregarDesafio();
    }

    function desafioAnterior() {
        desafios.anterior();
        carregarDesafio();
    }

    return {
        carregarDesafio,
        executar,
        proximoDesafio,
        desafioAnterior
    };
}