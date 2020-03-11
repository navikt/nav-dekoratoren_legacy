import Environment from '../../../../utils/Environment';

export interface InputState {
    loading: boolean;
    selectedInput: string;
    writtenInput: string;
    items: SokeresultatData[];
}

export interface SokeresultatData {
    priority: boolean;
    displayName: string;
    href: string;
    highlight: string;
    publish: {
        from: string;
        first: string;
    };
    modifiedTime: string;
    className: string;
}

export const defaultData: SokeresultatData = {
    priority: false,
    displayName: '',
    href: '',
    highlight: '',
    publish: {
        from: '',
        first: '',
    },
    modifiedTime: '',
    className: '',
};

export const visAlleTreff = (inputString: string): SokeresultatData => {
    return {
        priority: false,
        displayName: `${inputString}`,
        href: `${Environment.XP_BASE_URL}/sok?ord=${inputString}`,
        highlight: `Se alle treff ("${inputString}")`,
        publish: {
            from: '',
            first: '',
        },
        modifiedTime: '',
        className: '',
    };
};
