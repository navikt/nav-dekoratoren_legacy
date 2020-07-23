import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ToppBar from 'komponenter/chatbot/components/ToppBar';
import Interaksjonsvindu, {
    Bruker,
    Config,
} from 'komponenter/chatbot/components/Interaksjonsvindu';
import {
    Container,
    FridaKnapp,
} from 'komponenter/chatbot/components/ChatContainer/styles';
import { ConnectionConfig } from 'komponenter/chatbot/index';
import axios, { AxiosResponse } from 'axios';
import {
    deleteJSON,
    loadJSON,
    saveJSON,
} from 'komponenter/chatbot/services/cookiesService';
import {
    ConfigurationResponse,
    Message,
    SessionCreate,
    SessionCreateResponse,
} from 'komponenter/chatbot/api/Sessions';
import moment from 'moment';
import fridaIkon from 'komponenter/chatbot/assets/frida.svg';
import defaultIkon from 'komponenter/chatbot/assets/default.svg';
import { Bilde } from 'komponenter/common/bilde/Bilde';

export type ChatContainerState = {
    erApen: boolean;
    navn?: string | undefined;
    historie: MessageWithIndicator[];
    ikkeLastethistorie: MessageWithIndicator[];
    brukere: Bruker[];
    config?: Config;
    iKo: boolean;
    sisteMeldingId: number;
    avsluttet: boolean;
    brukereSomSkriver: {
        [userId: number]: number;
    };
    hentHistorie: boolean;
    visBekreftelse: 'OMSTART' | 'AVSLUTT' | 'NY_FANE' | undefined;
    lastHref: string | null;
    feil: boolean;
};

const defaultState: ChatContainerState = {
    erApen: false,
    navn: 'Chatbot Frida',
    historie: [],
    ikkeLastethistorie: [],
    config: undefined,
    brukere: [],
    iKo: false,
    sisteMeldingId: 0,
    avsluttet: false,
    brukereSomSkriver: {},
    hentHistorie: true,
    visBekreftelse: undefined,
    lastHref: '',
    feil: false,
};

export interface ShowIndicator {
    showIndicator: boolean;
}

export interface MessageWithIndicator extends Message, ShowIndicator {}

export const cookieKeys = {
    CONFIG: 'chatbot-frida_config',
    HISTORIE: 'chatbot-frida_historie',
    APEN: 'chatbot-frida_apen',
    EVAL: 'chatbot-frida_eval',
    MAILTIMEOUT: 'chatbot-frida_mail-timeout',
};

const clearCookies = () => {
    Object.values(cookieKeys).forEach(deleteJSON);
};

export default class ChatContainer extends Component<
    ConnectionConfig,
    ChatContainerState
> {
    baseUrl = 'https://api.puzzel.com/chat/v1';
    skriveindikatorTid = 1000;
    hentHistorieIntervall: number;
    lesIkkeLastethistorieIntervall: number;
    leggTilLenkeHandlerIntervall: number;
    events: Element[] = [];
    config: ConfigurationResponse;

    constructor(props: ConnectionConfig) {
        super(props);
        this.state = {
            ...defaultState,
            erApen: loadJSON(cookieKeys.APEN) || false,
            historie: loadJSON(cookieKeys.HISTORIE) || [],
            config: loadJSON(cookieKeys.CONFIG),
            sisteMeldingId: loadJSON(cookieKeys.HISTORIE)
                ? loadJSON(cookieKeys.HISTORIE)
                      .slice()
                      .reverse()
                      .find((_historie: any) => _historie.role === 1)
                    ? loadJSON(cookieKeys.HISTORIE)
                          .slice()
                          .reverse()
                          .find((_historie: any) => _historie.role === 1).id
                    : 0
                : 0,
        };

        this.start = this.start.bind(this);
        this.apne = this.apne.bind(this);
        this.lukk = this.lukk.bind(this);
        this.oppdaterNavn = this.oppdaterNavn.bind(this);
        this.avslutt = this.avslutt.bind(this);
        this.omstart = this.omstart.bind(this);
        this.hentConfig = this.hentConfig.bind(this);
        this.hentFullHistorie = this.hentFullHistorie.bind(this);
        this.handterMelding = this.handterMelding.bind(this);
        this.leggTilIHistorie = this.leggTilIHistorie.bind(this);
        this.lesIkkeLastethistorie = this.lesIkkeLastethistorie.bind(this);
        this.skjulIndikator = this.skjulIndikator.bind(this);
        this.skjulAlleIndikatorForBruker = this.skjulAlleIndikatorForBruker.bind(
            this
        );
        this.confirmAvslutt = this.confirmAvslutt.bind(this);
        this.confirmCancel = this.confirmCancel.bind(this);
        this.confirmOmstart = this.confirmOmstart.bind(this);
        this.leggTilLenkeHandler = this.leggTilLenkeHandler.bind(this);
        this.lukkOgAvslutt = this.lukkOgAvslutt.bind(this);
        this.settTimerConfig = this.settTimerConfig.bind(this);
    }

    componentDidMount() {
        if (
            !this.props.configId ||
            !this.props.queueKey ||
            !this.props.customerKey
        ) {
            console.error(
                'Mangler påkrevd parameter. Husk å ta med: customerKey, queueKey og configId.'
            );
            this.setState({
                feil: true,
            });
        } else if (this.state.erApen) {
            this.start();
        }
    }

    componentWillUnmount(): void {
        clearInterval(this.hentHistorieIntervall);
        clearInterval(this.lesIkkeLastethistorieIntervall);
        clearInterval(this.leggTilLenkeHandlerIntervall);
    }

    render() {
        const { queueKey, customerKey } = this.props;
        return (
            <Container
                erApen={this.state.erApen}
                queueKey={this.props.queueKey}
                tabIndex={this.state.erApen ? 0 : -1}
                aria-label={
                    this.state.erApen
                        ? `Samtalevindu: ${this.state.navn}`
                        : undefined
                }
                lang={this.state.erApen ? 'no' : undefined}
                role={this.state.erApen ? 'dialog' : undefined}
            >
                {!this.state.erApen && (
                    <FridaKnapp
                        onClick={this.apne}
                        tabIndex={this.state.erApen ? -1 : 0}
                        aria-label={
                            this.state.erApen
                                ? undefined
                                : `Samtalevindu: ${this.state.navn}`
                        }
                        lang={this.state.erApen ? undefined : 'no'}
                    >
                        <Bilde
                            src={
                                this.props.queueKey === 'Q_CHAT_BOT'
                                    ? fridaIkon
                                    : defaultIkon
                            }
                        />
                    </FridaKnapp>
                )}
                {this.state.erApen && (
                    <ToppBar
                        navn={
                            this.state.brukere.some(
                                (bruker: Bruker) => bruker.userType === 'Human'
                            )
                                ? `Chat med NAV`
                                : this.state.navn
                        }
                        lukk={() => this.lukk()}
                        omstart={() => this.omstart()}
                        avslutt={() => this.avslutt(true)}
                    />
                )}
                <Interaksjonsvindu
                    handterMelding={(melding, oppdater) =>
                        this.handterMelding(melding, oppdater)
                    }
                    skjulIndikator={(melding: MessageWithIndicator) =>
                        this.skjulIndikator(melding)
                    }
                    vis={this.state.erApen}
                    queueKey={queueKey}
                    customerKey={customerKey}
                    baseUrl={this.baseUrl}
                    historie={this.state.historie}
                    brukere={this.state.brukere}
                    iKo={this.state.iKo}
                    avsluttet={this.state.avsluttet}
                    config={this.state.config!}
                    skriveindikatorTid={this.skriveindikatorTid}
                    hentHistorie={() => this.hentHistorie()}
                    evaluationMessage={this.props.evaluationMessage}
                    visBekreftelse={this.state.visBekreftelse}
                    confirmAvslutt={() => this.confirmAvslutt()}
                    confirmOmstart={() => this.confirmOmstart()}
                    confirmCancel={() => this.confirmCancel()}
                    lukkOgAvslutt={() => this.lukkOgAvslutt()}
                    href={this.state.lastHref}
                    feil={this.state.feil}
                />
            </Container>
        );
    }

    async start(tving: boolean = false, beholdApen: boolean = false) {
        try {
            if (!this.state.config || tving) {
                await this.settTimerConfig();
                await this.hentConfig();
                await this.setState({
                    ...defaultState,
                    erApen: beholdApen,
                    historie: loadJSON(cookieKeys.HISTORIE) || [],
                    config: loadJSON(cookieKeys.CONFIG),
                });
            }

            if (!this.state.feil && this.state.erApen) {
                const node = ReactDOM.findDOMNode(this) as HTMLElement;
                node.focus();
                if (this.state.historie && this.state.historie.length < 1) {
                    // Henter full historie fra API
                    try {
                        const historie = await this.hentFullHistorie();
                        if (historie) {
                            const data: any[] = historie.data;
                            if (data.length > 0) {
                                for (const historie of data) {
                                    this.handterMelding(historie, true);
                                }
                            }
                            this.setState({
                                erApen: beholdApen,
                            });
                        }
                    } catch (e) {
                        console.error(e);
                        this.setState({
                            feil: true,
                        });
                    }
                } else {
                    // Har hentet historie fra cookies
                    for (const historie of this.state.historie) {
                        this.handterMelding({
                            ...historie,
                            showIndicator: false,
                        });
                    }
                    this.setState({
                        erApen: true,
                    });
                }

                this.hentHistorieIntervall = setInterval(
                    () => this.hentHistorie(),
                    1000
                );
                this.lesIkkeLastethistorieIntervall = setInterval(
                    () => this.lesIkkeLastethistorie(),
                    50
                );
                // this.leggTilLenkeHandlerIntervall = setInterval(
                //     () => this.leggTilLenkeHandler(),
                //     100
                // );
            }
        } catch (e) {
            console.error(e);
            this.setState({
                feil: true,
            });
        }
    }

    async apne() {
        saveJSON(cookieKeys.APEN, true);
        await this.setState({
            erApen: true,
        });
        this.start(false, true);
    }

    async lukk() {
        await this.setState({ erApen: false });
        saveJSON(cookieKeys.APEN, false);
    }

    omstart() {
        this.setState({
            visBekreftelse: 'OMSTART',
        });
    }

    async confirmOmstart() {
        if (!this.state.avsluttet) {
            await this.avslutt();
        }
        clearInterval(this.hentHistorieIntervall);
        clearInterval(this.lesIkkeLastethistorieIntervall);
        clearInterval(this.leggTilLenkeHandlerIntervall);
        const apen = loadJSON(cookieKeys.APEN) === true;
        clearCookies();
        saveJSON(cookieKeys.APEN, apen);
        this.start(true, apen);
    }

    oppdaterNavn(navn: string): void {
        if (this.state.navn !== navn) {
            this.setState({ navn });
        }
    }

    async avslutt(sporBruker: boolean = false) {
        if (sporBruker) {
            if (!this.state.avsluttet) {
                if (this.state.config) {
                    await this.setState({
                        visBekreftelse: 'AVSLUTT',
                    });
                }
            } else {
                this.lukkOgAvslutt();
            }
        } else {
            if (!this.state.avsluttet) {
                if (this.state.config) {
                    this.confirmAvslutt();
                }
            } else {
                this.confirmOmstart();
            }
        }
    }

    async confirmAvslutt() {
        await axios.delete(
            `${this.baseUrl}/sessions/${this.state.config!.sessionId}/${
                this.state.config!.requestId
            }`
        );
        if (!loadJSON(cookieKeys.MAILTIMEOUT)) {
            saveJSON(cookieKeys.MAILTIMEOUT, moment().add(4.5, 'm').valueOf());
        }
        this.confirmCancel();
    }

    confirmCancel() {
        this.setState({
            visBekreftelse: undefined,
        });
    }

    lukkOgAvslutt() {
        clearCookies();
        this.setState({
            ...defaultState,
            erApen: false,
        });
    }

    async hentConfig(): Promise<AxiosResponse<SessionCreateResponse>> {
        const session = await axios.post(`${this.baseUrl}/sessions`, {
            customerKey: this.props.customerKey,
            queueKey: this.props.queueKey,
            nickName: 'Bruker',
            chatId: 'bruker@customer.com',
            languageCode: 'NO',
            denyArchiving: false,
            intro: {
                variables: this.config.variables || undefined,
            },
        } as SessionCreate);

        const data: Config = {
            sessionId: `${this.props.customerKey}-${session.data.iqSessionId}`,
            sessionIdPure: session.data.iqSessionId,
            requestId: session.data.requestId,
            alive: moment(new Date()).add(2, 'hours').valueOf(),
        };

        saveJSON(cookieKeys.CONFIG, data);
        this.setState({
            config: data,
        });
        return session;
    }

    hentFullHistorie() {
        if (this.state.config) {
            return axios.get(
                `${this.baseUrl}/sessions/${this.state.config.sessionId}/messages/0`
            );
        } else {
            return undefined;
        }
    }

    async hentHistorie() {
        if (
            this.state.hentHistorie &&
            this.state.config &&
            !this.state.avsluttet
        ) {
            try {
                const res = await axios.get(
                    `${this.baseUrl}/sessions/${this.state.config.sessionId}/messages/${this.state.sisteMeldingId}`
                );
                const data: Message[] = res.data;

                if (data && data.length > 0) {
                    for (const historie of data) {
                        const showIndicator = historie.content === 'TYPE_MSG';
                        const historieMedIndikator: MessageWithIndicator = {
                            ...historie,
                            showIndicator: showIndicator,
                        };
                        this.setState({
                            ikkeLastethistorie: [
                                ...this.state.ikkeLastethistorie,
                                historieMedIndikator,
                            ],
                        });
                    }
                    let fantId = false;
                    let sisteId = 1;
                    while (!fantId) {
                        if (data[data.length - sisteId]) {
                            fantId = true;
                            this.setState({
                                sisteMeldingId: data[data.length - sisteId].id,
                            });
                        } else {
                            sisteId++;
                        }
                    }
                } else {
                    for (const historie of data) {
                        const historieMedIndikator: MessageWithIndicator = {
                            ...historie,
                            showIndicator: false,
                        };
                        this.handterMelding(historieMedIndikator, true);
                    }
                }
            } catch (e) {
                this.setState((state: ChatContainerState) => {
                    return {
                        hentHistorie: false,
                        avsluttet:
                            e.response && e.response.status === 404
                                ? true
                                : state.avsluttet,
                    };
                });
            }
        }
    }

    handterMelding(melding: MessageWithIndicator, oppdater: boolean = false) {
        if (melding.type === 'UserInfo') {
            if (
                !this.state.brukere.some(
                    (b: Bruker) => b.userId === melding.userId
                )
            ) {
                this.setState((state: ChatContainerState) => {
                    const brukere = state.brukere.concat({
                        userId: melding.userId,
                        avatarUrl: melding.content.avatarUrl,
                        nickName: melding.nickName,
                        role: melding.role,
                        userType: melding.content.userType,
                        aktiv: true,
                    });
                    return {
                        brukere,
                    };
                });
            }
            if (melding.content.userType === 'Human') {
                this.setState({
                    iKo: false,
                });
            }
        } else if (melding.type === 'Option') {
            for (let i = 0; i < melding.content.length; i++) {
                const m = melding.content[i];
                if (typeof m === 'string') {
                    melding.content[i] = {
                        tekst: m,
                        valgt: false,
                    };
                }
            }
        } else if (melding.type === 'OptionResult') {
            const besvart = this.state.historie.filter(
                (_h: any) => _h.id === melding.content.messageId
            )[0];
            const temp = besvart.content.find(
                (a: { tekst: string; valgt: boolean }) =>
                    a.tekst.toString() ===
                    melding.content.optionChoice.toString()
            );
            temp.valgt = true;
        } else if (melding.type === 'Event') {
            if (melding.content === 'USER_DISCONNECTED') {
                this.setState(
                    (state: ChatContainerState) => {
                        const brukere = state.brukere.map((bruker) => {
                            if (bruker.userId === melding.userId) {
                                bruker.aktiv = false;
                            }
                            return bruker;
                        });
                        return {
                            brukere,
                        };
                    },
                    () => {
                        const harAktiveBrukere =
                            this.state.brukere.filter(
                                (bruker: Bruker) => bruker.aktiv
                            ).length > 0;
                        if (!this.state.iKo && !harAktiveBrukere) {
                            setTimeout(async () => {
                                await this.avslutt();
                            }, 5000);
                        }
                    }
                );
            } else if (melding.content.includes('REQUEST_PUTINQUEUE')) {
                this.setState({
                    iKo: true,
                });
            } else if (melding.content === 'REQUEST_DISCONNECTED') {
                this.setState({
                    avsluttet: true,
                });
            }
        }
        this.skjulAlleIndikatorForBruker(melding.userId);
        this.leggTilIHistorie(melding, oppdater);
    }

    leggTilIHistorie(melding: MessageWithIndicator, oppdater: boolean = false) {
        if (
            oppdater &&
            !this.state.historie.some(
                (historie: Message) => historie.id === melding.id
            )
        ) {
            this.setState({
                historie: [...this.state.historie, melding],
            });
        }

        saveJSON(cookieKeys.HISTORIE, this.state.historie);
    }

    lesIkkeLastethistorie() {
        const now = moment().valueOf();
        if (this.state.erApen && this.state.ikkeLastethistorie.length > 0) {
            const [historie, ...resten] = this.state.ikkeLastethistorie;
            if (
                historie.role === 1 &&
                (historie.type === 'Message' ||
                    historie.type === 'Option' ||
                    historie.type === 'Evaluation')
            ) {
                const tid = this.state.brukereSomSkriver[historie.userId];
                if (this.state.brukereSomSkriver[historie.userId]) {
                    if (now - tid >= this.skriveindikatorTid) {
                        this.setState(
                            (state: ChatContainerState) => {
                                const brukereSomSkriver = {
                                    ...state.brukereSomSkriver,
                                };
                                brukereSomSkriver[historie.userId] = now;
                                return {
                                    brukereSomSkriver,
                                    ikkeLastethistorie: resten,
                                };
                            },
                            () => {
                                this.handterMelding(
                                    { ...historie, showIndicator: true },
                                    true
                                );
                            }
                        );
                    }
                } else {
                    this.setState((state: ChatContainerState) => {
                        const brukereSomSkriver = {
                            ...state.brukereSomSkriver,
                        };
                        brukereSomSkriver[historie.userId] = now;
                        return {
                            brukereSomSkriver,
                        };
                    });
                }
            } else {
                this.setState(
                    {
                        ikkeLastethistorie: resten,
                    },
                    () => {
                        this.handterMelding(historie, true);
                    }
                );
            }
        }
    }

    skjulIndikator(melding: MessageWithIndicator) {
        this.setState(
            (state: ChatContainerState) => {
                const historier = [...state.historie];
                const historie = historier.find(
                    (h: MessageWithIndicator) => h.id === melding.id
                );

                if (historie) {
                    const index = historier.indexOf(historie);
                    state.historie[index] = historie;
                    historie.showIndicator = false;
                    return {
                        historie: historier,
                    };
                } else {
                    return state;
                }
            },
            () => {
                saveJSON(cookieKeys.HISTORIE, this.state.historie);
            }
        );
    }

    skjulAlleIndikatorForBruker(brukerId: number) {
        const indikatorer = this.state.historie.filter(
            (historie: MessageWithIndicator) =>
                historie.userId === brukerId &&
                historie.content === 'TYPE_MSG' &&
                historie.showIndicator
        );

        indikatorer.forEach((indikator: MessageWithIndicator) => {
            this.setState((state: ChatContainerState) => {
                const historier = [...state.historie];
                indikator.showIndicator = false;
                const index = historier.indexOf(indikator);
                state.historie[index] = indikator;
                return {
                    historie: historier,
                };
            });
        });
    }

    leggTilLenkeHandler() {
        const lenker = document.getElementsByClassName('bbcode-link');
        for (const lenke of Array.from(lenker)) {
            if (!(this.events.indexOf(lenke) > -1)) {
                lenke.addEventListener('click', (e: Event) => {
                    e.preventDefault();
                    if (lenke.getAttribute('target') === '_blank') {
                        this.setState({
                            visBekreftelse: 'NY_FANE',
                            lastHref: lenke.getAttribute('href'),
                        });
                    } else if (lenke.getAttribute('href')) {
                        window.location.href = lenke.getAttribute('href')!;
                    }
                });
                this.events.push(lenke);
            }
        }
    }

    async settTimerConfig() {
        const res = await axios.get(
            `${this.baseUrl}/configurations/${this.props.customerKey}-${this.props.configId}`
        );
        const config = res.data as ConfigurationResponse;
        if (config) {
            this.config = res.data;
            const timer = parseInt(config.botMessageTimerMs, 10);
            if (timer) {
                this.skriveindikatorTid = timer;
            }
        }
    }
}
