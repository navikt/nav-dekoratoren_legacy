import React, { Component } from 'react';
import { KommunikasjonProps } from 'komponenter/chatbot/components/Kommunikasjon';
import { Event } from 'komponenter/chatbot/components/Eventviser/styles';
import Skriveindikator from 'komponenter/chatbot/components/Skriveindikator';

export default class Eventviser extends Component<KommunikasjonProps, {}> {
    constructor(props: KommunikasjonProps) {
        super(props);

        this.visEventTekst = this.visEventTekst.bind(this);
    }

    render() {
        return <Event tabIndex={0}>{this.visEventTekst()}</Event>;
    }

    private visEventTekst() {
        const { nickName, userId } = this.props.beskjed;
        if (this.props.beskjed.content === 'USER_DISCONNECTED') {
            return `${nickName} forlot chatten.`;
        } else if (this.props.beskjed.content === 'USER_CONNECTED') {
            return `${nickName} ble med i chatten.`;
        } else if (this.props.beskjed.content === 'REQUEST_DISCONNECTED') {
            return 'Du avsluttet chatten.';
        } else if (
            this.props.beskjed.content === 'TYPE_MSG' &&
            this.props.hentBrukerType(userId) === 'Human'
        ) {
            return (
                <Skriveindikator
                    beskjed={this.props.beskjed}
                    skriveindikatorTid={this.props.skriveindikatorTid!}
                    gjemAutomatisk={false}
                />
            );
        } else {
            return;
        }
    }
}
