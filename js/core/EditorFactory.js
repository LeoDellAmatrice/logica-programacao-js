const PALAVRAS_PERMITIDAS = [
  'console',
  '.log',
  'log',
  'let',
  'const',
  'if',
  'else',
  'for',
  'while',
  'function',
  'return'
];

export function EditorFactory() {

    let editor = null;

    let palavrasAutoComplete = [];

    function addToAutoComplete(list){
        list.forEach(word => {
            palavrasAutoComplete.push(word)
        });
    }

    function create(elementId, {
        theme = "railscasts",
        value = ""
    } = {}) {
        editor = CodeMirror(document.getElementById(elementId), {
            mode: "javascript",
            theme,
            readOnly: false,
            lineNumbers: true,
            tabSize: 2,
            indentUnit: 2,
            smartIndent: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            autofocus: true,
            styleActiveLine: true,
            javascriptHint: true,
            showHint: true,
            extraKeys: {
                'Ctrl-Space': 'autocomplete'
            },
            value
        });
        editor.getWrapperElement().id = "codeMirrorEditor";

        editor.on('inputRead', function (cm, change) {
            if (
                change.text[0] === '.' ||
                /[a-zA-Z_]/.test(change.text[0])
            ) {
                cm.showHint({
                    hint: hintEducacional,
                    completeSingle: false
                });
            }
        });

        return editor;
    }

    function hintEducacional(cm) {
        const cursor = cm.getCursor();
        const token = cm.getTokenAt(cursor);

        const inicio = token.start;
        const fim = cursor.ch;
        const palavraAtual = token.string;

        const sugestoes = palavrasAutoComplete
            .filter(p => p.startsWith(palavraAtual))
            .map(p => ({
            text: p,
            displayText: p
            }));

        return {
            list: sugestoes,
            from: CodeMirror.Pos(cursor.line, inicio),
            to: CodeMirror.Pos(cursor.line, fim)
        };
    }

    function getValue() {
        return editor.getValue();
    }

    function setValue(value) {
        editor.setValue(value);
    }

    function toggleTheme() {
        const current = editor.getOption("theme");
        editor.setOption("theme", current === "default" ? "railscasts" : "default");
    }

    function limparDestaques() {
        editor.eachLine(line => {
            editor.removeLineClass(line, "background", "linha-erro");
        });
    }

    function destacarLinha(linha) {
        limparDestaques();
        editor.addLineClass(linha - 1, "background", "linha-erro");
        editor.scrollIntoView({ line: linha - 1, ch: 0 }, 100);
    }

    return {
        create,
        addToAutoComplete,
        getValue,
        setValue,
        toggleTheme,
        destacarLinha,
        limparDestaques
    };
}
