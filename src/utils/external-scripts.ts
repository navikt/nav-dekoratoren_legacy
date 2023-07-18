const loadedScripts = new Set<string>();


export const loadExternalScript = (uri: string, async = true) => {
    return new Promise<void>((resolve) => {
        if (loadedScripts.has(uri)) {
            return resolve();
        }

        loadedScripts.add(uri);
        const script = document.createElement('script');
        if (async) {
            script.async = true;
        }
        script.src = uri;
        script.onload = () => {
            resolve();
        };
        document.body.appendChild(script);
    });
};
