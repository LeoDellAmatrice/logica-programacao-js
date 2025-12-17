export function SettingsModalFactory(SettingsFactory) {

    let modalElement = null;
    
    function criarModal() {
        if (modalElement) return;

        modalElement = document.createElement("div");
        modalElement.className = "modal-overlay";

        modalElement.innerHTML = `
        <!-- Modal de Configurações -->
        <div id="modal-configuracoes" class="modal">
        <div class="modal-conteudo modal-config">

            <!-- Cabeçalho -->
            <div class="modal-cabecalho">
            <h2>Configurações</h2>
            <button class="modal-fechar" id="config-fechar">&times;</button>
            </div>

            <!-- Conteúdo -->
            <div class="modal-config-conteudo">

            <!-- Seção: Aparência -->
            <div class="config-secao">
                <h3>Aparência</h3>

                <div class="config-item">
                <span>Tema do Editor</span>
                <select class="config-select" id="config-theme">
                    <option value="Default">Light</option>
                    <option value="railscasts" selected>Dark</option>
                </select>
                </div>

                <div class="config-item">
                <span>Tamanho da Fonte</span>
                <select class="config-select" id="config-font-size">
                    <option value="12">Pequena</option>
                    <option value="14" selected>Média</option>
                    <option value="16">Grande</option>
                </select>
                </div>
            </div>

            <!-- Seção: Editor -->
            <div class="config-secao">
                <h3>Editor</h3>

                <label class="checkbox-container">
                <input type="checkbox" id="config-autocomplete">
                <span class="checkmark"></span>
                <span class="checkbox-text">Autocomplete automático</span>
                </label>

                <label class="checkbox-container">
                <input type="checkbox" id="config-highlight-line">
                <span class="checkmark"></span>
                <span class="checkbox-text">Destacar linha atual</span>
                </label>
            </div>

            <!-- Seção: Progresso -->
            <div class="config-secao">
                <h3>Progresso</h3>

                <div class="config-item alerta">
                <span>Reiniciar progresso</span>
                <button class="btn btn-danger" id="config-reset">
                    Resetar
                </button>
                </div>
            </div>

            </div>

            <!-- Rodapé -->
            <div class="modal-rodape">
            <button class="btn btn-primario" id="config-sair">
                Sair
            </button>
            </div>

        </div>
        </div>
        `;


        document.body.appendChild(modalElement);

        initModalButtons();

    }

    function showModal() {
        criarModal();
        modalElement.style.display = "flex";
    }

    function closeModal() {
        modalElement.style.display = "none";
    }

    function resetConfig(){
        throw new Error("Nao Implementado");
    }

    function initModalButtons() {

        document.getElementById('config-fechar').onclick = closeModal;

        document.getElementById('config-sair').onclick = closeModal;

        document.getElementById("config-reset").onclick = resetConfig;

        document.getElementById('config-theme').onchange = (e) => {
            SettingsFactory.update('theme', e.target.value);
        };

        document.getElementById('config-font-size').onchange = (e) => {
            SettingsFactory.update('fontSize', Number(e.target.value));
        };

        document.getElementById('config-autocomplete').onchange = (e) => {
            SettingsFactory.update('autocomplete', e.target.checked);
        };

        document.getElementById('config-highlight-line').onchange = (e) => {
            SettingsFactory.update('highlightLine', e.target.checked);
        };

    }

    return {
        show: showModal,
        close: closeModal
    };
}
