import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Container,
    Ikon,
    Tekst,
} from 'komponenter/chatbot/components/Alertstripe/styles';

export type AlertstripeProps = {
    type: 'info' | 'suksess' | 'advarsel' | 'feil';
};

export default class Alertstripe extends Component<AlertstripeProps, {}> {
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this) as HTMLElement;
        node.focus();
    }

    render() {
        return (
            <Container type={this.props.type} tabIndex={0}>
                <Ikon type={this.props.type} />
                <Tekst>{this.props.children}</Tekst>
            </Container>
        );
    }
}
