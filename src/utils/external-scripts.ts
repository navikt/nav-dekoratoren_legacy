export const loadExternalScript = (uri: string) => {
    return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = uri;
        script.onload = () => {
            resolve();
        };
        document.body.appendChild(script);
    });
};
