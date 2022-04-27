import React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import BEMHelper from 'utils/bem';

interface Props {
    className: string;
    classElement: string;
    children: React.ReactNode;
}

const Listelement: React.FunctionComponent<Props> = (props) => {
    const listelementClass = BEMHelper(props.className);
    return (
        <li className={listelementClass.element('meny', 'listItem')}>
            <Undertittel>
                <span className={listelementClass.element('meny', props.classElement)}>{props.children}</span>
            </Undertittel>
        </li>
    );
};

export default Listelement;
