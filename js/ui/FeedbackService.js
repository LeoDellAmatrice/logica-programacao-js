export function FeedbackService(toast, header) {

    let hidePopUpEnabled = false;

    function show(text, type = "info", duration = 2500) {

        if (!hidePopUpEnabled){
            toast.show(text, type, duration);
        }

        if (type !== "info"){
            header.setStatus(type);
        }
    }

    function setHide(value){
        hidePopUpEnabled = value;
    }

    return { show, setHide };
}
