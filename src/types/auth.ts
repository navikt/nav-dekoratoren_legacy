export type RawResolvedSessionData = {
    session?: {
        created_at: string;
        ends_at: string;
        timeout_at: string;
        ends_in_seconds: number;
        active: boolean;
        timeout_in_seconds: number;
    };
    tokens?: {
        expire_at: string;
        refreshed_at: string;
        expire_in_seconds: number;
        next_auto_refresh_in_seconds: number;
        refresh_cooldown: boolean;
        refresh_cooldown_seconds: number;
    };
};

export type RawResolvedAuthData = {
    authenticated: boolean | undefined;
    name: string | undefined;
    securityLevel: string | undefined;
} & RawResolvedSessionData;

export type FulfilledValues = {
    authenticated?: boolean;
    name?: string;
    securityLevel?: string;
    session?: RawResolvedSessionData['session'];
    tokens?: RawResolvedSessionData['tokens'];
};
