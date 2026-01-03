import { ErrorTranslator } from "../core/ErrorTranslator.js";

export function AppController(editor, desafios, feedback, output) {

    const errorTranslator = ErrorTranslator();

    function carregarDesafio() {
        const dados = desafios.getDados();

        document.getElementById("desafio-number").textContent =
            `Desafio ${desafios.getAtual() + 1}`;

        document.getElementById("titulo").textContent = dados.titulo;
        document.getElementById("instrucoes").textContent = dados.instrucoes;

        output.clear();
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
        editor.animarExecucaoCodeMirror()

        // 1️⃣ Executar o código SEMPRE
        try {
            const fakeConsole = {
                _output: "",
                log: (...args) => {
                    fakeConsole._output += args.join(" ") + "\n";
                }
            };

            new Function("console", code)(fakeConsole);

            output.set(fakeConsole._output || "Código sem erros. Console sem mensagens.\nuse console.log() para exibir mensagens aqui :)");
        } catch (e) {
            const info = extrairLinhaColuna(e);
            const mensagemAmigavel = errorTranslator.traduzir(e);

            feedback.show(mensagemAmigavel.hint, "info", 6000)

            if (info) {
                editor.destacarLinha(info.linha);
                output.set(
                    `Erro na linha: ${info.linha}\n` +
                    `${mensagemAmigavel.text}\n\n` +
                    `Detalhe técnico: ${e.message}`
                );
            } else {
                output.set(
                    `Sem Informação de linha.\n` +
                    `${mensagemAmigavel.text}\n\n` +
                    `Detalhe técnico: ${e.message}`
                );
            }
        }

        // 2️⃣ Validar SEPARADAMENTE
        try {
            const valido = desafios.validar(code);

            console.log(valido.message)

            if (valido.ok) {
                desafios.avancar();
                editor.addToAutoComplete(desafios.getDadosUnlock());
                feedback.show("Parabéns! Você completou o desafio.", "success");
            } else {
                feedback.show("Desafio não foi completo. Tente novamente.", "error");
                if (valido.message) feedback.show(valido.message, "info", 5000)
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
        editor.clearEditor();
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