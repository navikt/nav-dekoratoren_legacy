import React, { Component } from 'react';
import Moment from 'react-moment';
import {
    Container,
    NickName,
} from 'komponenter/chatbot/components/MetaInfo/styles';

export type MetaInfoProps = {
    nickName?: string;
    sent?: string;
    side?: 'VENSTRE' | 'HOYRE';
    skraTekst?: boolean;
};

export default class MetaInfo extends Component<MetaInfoProps, {}> {
    render() {
        const { nickName, sent } = this.props;
        return (
            <Container side={this.props.side}>
                {nickName !== 'Bruker' && (
                    <NickName aria-hidden="true" side={this.props.side}>
                        {nickName}
                    </NickName>
                )}
                <Moment aria-hidden="true" format="HH:mm">
                    {sent}
                </Moment>
            </Container>
        );
    }
}
