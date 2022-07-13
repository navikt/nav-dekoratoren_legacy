import React from 'react';
import BEMHelper from 'utils/bem';
import { Heading } from '@navikt/ds-react';

interface Props {
    className: string;
    classElement: string;
    children: React.ReactNode;
}

const Listelement: React.FunctionComponent<Props> = (props) => {
    const listelementClass = BEMHelper(props.className);
    return (
        <li className={listelementClass.element('meny', 'listItem')}>
            <Heading level="2" size="small">
                <span className={listelementClass.element('meny', props.classElement)}>{props.children}</span>
            </Heading>
        </li>
    );
};

export default Listelement;
