import React from 'react';
import BEMHelper from '../../../../../../utils/bem';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

interface Props {
    className: string;
}

const Listelement: React.FunctionComponent<Props> = props => {
    const listelementClass = BEMHelper(props.className);
    return (
        <li className={listelementClass.element('seksjon', 'listItem')}>
            <Undertittel>
                <span className={listelementClass.element('seksjon', 'navn')}>
                    {props.children}
                </span>
            </Undertittel>
        </li>
    );
};

export default Listelement;
