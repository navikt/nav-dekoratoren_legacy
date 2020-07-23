import React, { ChangeEvent, Component, FormEvent } from 'react';
import axios from 'axios';
import { Config } from 'komponenter/chatbot/components/Interaksjonsvindu';
import { EmailSend } from 'komponenter/chatbot/api/Sessions';
import tema from 'komponenter/chatbot/tema/tema';
import {
    EpostFelt,
    Feilmelding,
    Form,
    Hoyre,
    SendKnapp,
    Suksessmelding,
    Venstre,
} from 'komponenter/chatbot/components/EmailFeedback/styles';

type EmailFeedbackProps = {
    baseUrl: string;
    config: Config;
};

type EmailFeedbackState = {
    melding: string;
    tilbakemelding: Tilbakemelding;
};

interface Tilbakemelding {
    error: string;
    suksess: string;
}

export default class EmailFeedback extends Component<
    EmailFeedbackProps,
    EmailFeedbackState
> {
    constructor(props: any) {
        super(props);

        this.state = {
            melding: '',
            tilbakemelding: {
                error: '',
                suksess: '',
            },
        };

        this.sendMail = this.sendMail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <Form onSubmit={(e) => this.sendMail(e)} noValidate>
                <Venstre>
                    <EpostFelt
                        type="email"
                        placeholder="Din e-post"
                        onChange={(e) => this.handleChange(e)}
                        error={!!this.state.tilbakemelding.error}
                    />
                    {this.state.tilbakemelding.suksess && (
                        <Suksessmelding>
                            {this.state.tilbakemelding.suksess}
                        </Suksessmelding>
                    )}
                    {this.state.tilbakemelding.error && (
                        <Feilmelding>
                            {this.state.tilbakemelding.error}
                        </Feilmelding>
                    )}
                </Venstre>
                <Hoyre>
                    <SendKnapp type="submit">Send</SendKnapp>
                </Hoyre>
            </Form>
        );
    }

    async sendMail(e?: FormEvent<HTMLFormElement>) {
        if (e) {
            e.preventDefault();
        }
        await this.setState({
            tilbakemelding: {
                error: '',
                suksess: '',
            },
        });
        if (!this.state.melding) {
            await this.setState({
                tilbakemelding: {
                    ...this.state.tilbakemelding,
                    error: 'Skriv inn e-post',
                },
            });
        }
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
        );
        if (!validEmailRegex.test(this.state.melding)) {
            await this.setState({
                tilbakemelding: {
                    ...this.state.tilbakemelding,
                    error: 'Din e-post er ugyldig.',
                },
            });
        }
        if (!this.state.tilbakemelding.error) {
            try {
                await axios.post(
                    `${this.props.baseUrl}/sessions/${this.props.config.sessionId}/email`,
                    {
                        toEmailAddress: this.state.melding,
                        emailSubject: 'Chatlog fra NAV',
                        fromEmailDisplayName: 'NAV Kontaktsenter',
                        preText:
                            'Hei,[br] her er referatet fra din chatsamtale med oss:',
                        postText:
                            'Takk for din henvendelse.[br][br]Hilsen,[br] NAV Kontaktsenter',
                        timeZoneId: 'W. Europe Standard Time',
                        logo: {
                            url:
                                'https://www.nav.no/_public/beta.nav.no/images/logo.png',
                            link: 'https://www.nav.no',
                            alt: 'NAV Kontaktsenter',
                        },
                        layout: {
                            topBackgroundColor: '#FFFFFF',
                            topLineColor: '#555555',
                            bottomLineColor: '#c30000',
                            textStyle:
                                'font-size:' +
                                tema.storrelser.tekst.generell +
                                ';font-family:' +
                                tema.tekstFamilie,
                        },
                    } as EmailSend
                );

                this.setState({
                    tilbakemelding: {
                        error: '',
                        suksess: `E-posten ble sendt til ${this.state.melding}`,
                    },
                });
            } catch (e) {
                console.error(e);
            }
        }
    }

    handleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ melding: e.target.value });
    }
}
