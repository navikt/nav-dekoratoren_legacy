import React, { Component } from 'react';
import {
    Container,
    Indikator,
    IndikatorDot,
} from 'komponenter/chatbot/components/Skriveindikator/styles';
import { MessageWithIndicator } from 'komponenter/chatbot/components/ChatContainer';

type SkriveindikatorProps = {
    beskjed: MessageWithIndicator;
    skriveindikatorTid: number;
    gjemAutomatisk: boolean;
};

type SkriveindikatorState = {
    vis: boolean;
};

export default class Skriveindikator extends Component<
    SkriveindikatorProps,
    SkriveindikatorState
> {
    gjemTid: number;
    constructor(props: SkriveindikatorProps) {
        super(props);
        this.state = {
            vis: this.props.beskjed.showIndicator,
        };

        this.setGjemTimeout = this.setGjemTimeout.bind(this);
    }

    componentDidMount(): void {
        this.setGjemTimeout();
    }

    componentWillUnmount(): void {
        clearTimeout(this.gjemTid);
    }

    render() {
        if (this.props.beskjed.showIndicator) {
            return (
                <Container>
                    <Indikator>
                        <IndikatorDot />
                        <IndikatorDot />
                        <IndikatorDot />
                    </Indikator>
                </Container>
            );
        } else {
            return null;
        }
    }

    setGjemTimeout() {
        if (this.props.gjemAutomatisk) {
            this.gjemTid = setTimeout(() => {
                this.setState({
                    vis: false,
                });
            }, this.props.skriveindikatorTid - 500);
        }
    }
}
