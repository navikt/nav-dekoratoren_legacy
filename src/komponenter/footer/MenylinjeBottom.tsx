import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { genererUrl } from '../../utils/Environment';
import BEMHelper from '../../utils/bem';
import { lenkerBunn } from './FooterLenker';
import Tekst from '../../tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    classname: string;
}

const MenylinjeBottom = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    return (
        <section className={cls.element('menylinje-bottom')}>
            <ul className="bottom-venstre">
                {lenkerBunn.map(lenke => {
                    return (
                        <li key={lenke.lenketekst}>
                            <Lenke href={genererUrl(lenke.url)}>
                                {lenke.lenketekst}
                            </Lenke>
                        </li>
                    );
                })}
            </ul>
            <ul className="bottom-hoyre">
                <li>
                    <Lenke href="#">
                        <Tekst id="footer-del-skjerm" />
                    </Lenke>
                </li>
            </ul>
        </section>
    );
};

export default MenylinjeBottom;
