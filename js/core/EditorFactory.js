export function EditorFactory() {
    let editor = null;

    function create(elementId, {
        theme = "railscasts",
        value = ""
    } = {}) {
        editor = CodeMirror(document.getElementById(elementId), {
            mode: "javascript",
            theme,
            lineNumbers: true,
            tabSize: 2,
            indentUnit: 2,
            smartIndent: true,
            matchBrackets: true,
            autofocus: true,
            value
        });

        editor.getWrapperElement().id = "codeMirrorEditor";
        return editor;
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
        getValue,
        setValue,
        toggleTheme,
        destacarLinha,
        limparDestaques
    };
}
