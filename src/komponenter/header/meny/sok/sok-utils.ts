export interface InputState {
    inputString: string;
    items: SokeresultatData[];
}

export interface SokeresultatData {
    priority?: boolean;
    displayName?: string;
    href?: string;
    highlight?: string;
    publish?: {
        from: string;
        first: string;
    };
    modifiedTime?: string;
    className?: string;
}

export const defaultData: SokeresultatData = {};

export const visAlleTreff = (inputString: string): SokeresultatData[] => {
    return [
        {
            priority: false,
            displayName: `Se alle treff ("${inputString}")`,
            href: `/sok?ord=${inputString}`,
            highlight: '',
            publish: {
                from: '',
                first: '',
            },
            modifiedTime: '',
            className: '',
        },
    ];
};
