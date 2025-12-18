import { settingsStore } from '../core/SettingsStore.js';

export function FeedbackService(toast, header) {

    let hidePopUpEnabled = false;

    function show(text, type = "info") {

        if (!hidePopUpEnabled){
            toast.show(text, type);
        }

        header.setStatus(type);
    }

    function setHide(value){
        hidePopUpEnabled = value;
    }
    
    return { show, setHide };
}
