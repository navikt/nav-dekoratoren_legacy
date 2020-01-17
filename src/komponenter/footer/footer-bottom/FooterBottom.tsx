import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { genererUrl, verifyWindowObj } from '../../../utils/Environment';
import BEMHelper from '../../../utils/bem';
import { lenkerBunn } from '../Footer-lenker';
import Tekst from '../../../tekster/finn-tekst';

interface Props {
    classname: string;
}

const FooterBottom = ({ classname }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <section className={cls.element('menylinje-bottom')}>
            <ul className="bottom-venstre">
                {verifyWindowObj() &&
                    lenkerBunn.map(lenke => {
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
export default FooterBottom;
