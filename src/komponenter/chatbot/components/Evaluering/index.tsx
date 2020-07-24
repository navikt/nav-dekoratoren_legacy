import React, { Component } from 'react';
import {
    Container,
    Eval,
    Outer,
} from 'komponenter/chatbot/components/Evaluering/styles';
import rating1 from 'komponenter/chatbot/assets/rating-1.svg';
import rating2 from 'komponenter/chatbot/assets/rating-2.svg';
import rating3 from 'komponenter/chatbot/assets/rating-3.svg';
import rating4 from 'komponenter/chatbot/assets/rating-4.svg';
import rating5 from 'komponenter/chatbot/assets/rating-5.svg';
import { getCookie } from 'komponenter/chatbot/services/cookiesService';
import { chatStateKeys } from 'komponenter/chatbot/components/ChatContainer';
import { Bilde } from 'komponenter/common/bilde/Bilde';

type EvalueringProps = {
    evaluer: (evaluering: number) => void;
    opprettEvaluering: () => void;
    baseUrl: string;
    queueKey: string;
    nickName: string;
};

export type EvalueringState = {
    valgt: boolean;
    valgtSvar: number;
};

export default class Evaluering extends Component<
    EvalueringProps,
    EvalueringState
> {
    ratings = [rating1, rating2, rating3, rating4, rating5];
    checkLoop: number;
    constructor(props: EvalueringProps) {
        super(props);
        this.state = {
            valgt: !!getCookie(chatStateKeys.EVAL),
            valgtSvar: getCookie(chatStateKeys.EVAL),
        };
    }

    componentDidMount() {
        this.checkLoop = setInterval(() => {
            if (!this.state.valgt && !this.state.valgtSvar) {
                this.setState({
                    valgt: !!getCookie(chatStateKeys.EVAL),
                    valgtSvar: getCookie(chatStateKeys.EVAL),
                });
            }
        }, 100);
        this.props.opprettEvaluering();
    }

    componentWillUnmount(): void {
        clearInterval(this.checkLoop);
    }

    render() {
        const evalueringer = [];
        for (let i = 1; i <= 5; i++) {
            evalueringer.push(
                <Eval
                    onClick={() => this.props.evaluer(i)}
                    evalValgt={this.state.valgt}
                    valgt={this.state.valgtSvar === i}
                    aria-label={
                        this.state.valgt
                            ? ''
                            : `Valgmulighet ${i}: Evaluering ${i} av 5`
                    }
                    tabIndex={this.state.valgt ? -1 : 0}
                    aria-hidden={this.state.valgt}
                    key={i}
                >
                    <Bilde src={this.ratings[i - 1]} />
                </Eval>
            );
        }
        return (
            <Outer>
                <Container
                    aria-label={`${
                        this.props.nickName
                    } har sendt deg en evaluering med 5 valgmuligheter. ${
                        this.state.valgt
                            ? 'Du har alt sendt inn din evaluering med valget ' +
                              this.state.valgtSvar +
                              ' av 5.'
                            : ''
                    }`}
                    tabIndex={0}
                >
                    {evalueringer}
                </Container>
            </Outer>
        );
    }
}
