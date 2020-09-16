export interface Soketreff {
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

export interface Sokeresultat {
    isMore: boolean;
    isSortDate: true;
    hits: Soketreff[];
    total: number;
    word: string;
}
