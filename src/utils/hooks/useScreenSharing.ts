
import { useEffect } from "react";

import { vendorScripts } from "komponenter/header/vendorScripts";
import { loadExternalScript } from "utils/external-scripts";

type UseScreenSharingOptions = {
		enabled: boolean;
		cookies: Record<string, string>;
}

export function useScreenSharing({ enabled, cookies }: UseScreenSharingOptions) {
    useEffect(() => {
        const vngageCookieExists = !!cookies['vngage.id'];
        const shouldLoad = vngageCookieExists && enabled;

        if (shouldLoad) {
            loadExternalScript(vendorScripts.skjermdeling);
        }

    }, [enabled, cookies]);
}
