export type Audience = 'person' | 'employer' | 'provider' | 'other';

export type Language = 'no' | 'nn' | 'en';

export interface Soketreff {
    priority: boolean;
    displayName: string;
    href: string;
    displayPath: string;
    highlight: string;
    publish?: {
        from?: string;
        first?: string;
    };
    createdTime: string;
    modifiedTime?: string;
    officeInformation?: {
        phone?: string;
        audienceReception?: string;
    };
    audience?: Audience | Audience[];
    language: Language;
    hidePublishDate: boolean;
    hideModifiedDate: boolean;
}

export interface Sokeresultat {
    isMore: boolean;
    isSortDate: true;
    hits: Soketreff[];
    total: number;
    word: string;
}
