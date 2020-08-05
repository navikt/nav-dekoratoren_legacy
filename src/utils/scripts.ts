export const loadVergic = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://account.psplugin.com/83BD7664-B38B-4EEE-8D99-200669A32551/ps.js`;
    document.body.appendChild(script);
};
