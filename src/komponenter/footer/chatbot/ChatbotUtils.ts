// Obs: Dette classname'et genereres av styledcomponents i chatbot'en
// Denne er gyldig for chatbot v.1.2.2
const openButtonClassname = 'sc-eqIVtm';
export const chatbotClassname = 'gxKraP';

const getButtonFromClassname = (className: string, index = 0) => {
    const buttons = document.getElementsByClassName(className);
    const button =
        buttons && buttons.length > index && (buttons[index] as HTMLElement);
    return button;
};

const getClickFunc = (className: string, index = 0) => {
    const button = getButtonFromClassname(className, index);

    if (button) {
        return button.click.bind(button);
    }

    return null;
};

export const openChatbot = async (callback: (isOpen: boolean) => void) => {
    const openFunc = getClickFunc(openButtonClassname);

    if (!openFunc) {
        callback(false);
        return;
    }

    await new Promise(() => openFunc())
        .then(() => callback(true))
        .catch(() => callback(false));
};

export const setCallbackOnChatbotOpen = (callback: () => void) => {
    const openButton = getButtonFromClassname(openButtonClassname);
    if (!openButton) {
        return;
    }

    openButton.onclick = callback;
};
