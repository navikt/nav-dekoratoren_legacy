import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Boks,
    JaKnapp,
    NeiKnapp,
    Tekst,
    Undertekst,
} from 'komponenter/chatbot/components/Bekreftelsesboks/styles';
import avsluttIkon from 'komponenter/chatbot/assets/avslutt.svg';
import checkIkon from 'komponenter/chatbot/assets/check.svg';
import { Ikon } from 'komponenter/chatbot/components/Alertstripe/styles';
import { Bilde } from 'komponenter/common/bilde/Bilde';

type BekreftelsesboksProps = {
    tekst?: string;
    undertekst?: string | null;
    ja?: () => void;
    nei?: () => void;
};

export default class Bekreftelsesboks extends Component<
    BekreftelsesboksProps,
    {}
> {
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this) as HTMLElement;
        node.focus();
    }

    render() {
        return (
            <Boks type="advarsel" tabIndex={0}>
                <Ikon type="advarsel" tabIndex={-1} aria-hidden={true} />
                <Tekst>
                    {this.props.tekst}
                    {this.props.undertekst && (
                        <Undertekst>{this.props.undertekst}</Undertekst>
                    )}
                </Tekst>
                {this.props.ja && (
                    <JaKnapp onClick={() => this.props.ja!()} aria-label={'Ja'}>
                        <Bilde src={checkIkon} />
                    </JaKnapp>
                )}
                {this.props.nei && (
                    <NeiKnapp
                        onClick={() => this.props.nei!()}
                        aria-label={'Nei'}
                    >
                        <Bilde src={avsluttIkon} />
                    </NeiKnapp>
                )}
            </Boks>
        );
    }
}
