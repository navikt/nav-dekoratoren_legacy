import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../utils/bem';

const FooterLenkeMeny = ({ className }: { className: string }) => {
    const cls = BEMHelper(className);
    return (
        <div className="footernavsection innhold-container">
            <section className={cls.element('seksjon')}>
                <ul>
                    <li>
                        <Lenke href="#">
                            <Normaltekst>
                                Alle våre ytelser og tjenester
                            </Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <ul>
                    <li>
                        <Lenke href="#">
                            <Normaltekst>Kontakt oss</Normaltekst>
                        </Lenke>
                    </li>
                    <li className="x">
                        <Lenke href="#">
                            <Normaltekst>Klage og tilbakemelding</Normaltekst>
                        </Lenke>
                    </li>

                    <li>
                        <Lenke href="#">
                            <Normaltekst>Fjernstyring</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <ul>
                    <li className="x">
                        <Lenke href="#">
                            <Normaltekst>Tilgjengelighet</Normaltekst>
                        </Lenke>
                    </li>

                    <li>
                        <Lenke href="#">
                            <Normaltekst>Personvern i NAV</Normaltekst>
                        </Lenke>
                    </li>
                    <li className="x">
                        <Lenke href="#">
                            <Normaltekst>
                                Rundskriv, forskrifter og folketrygden - Lovdata
                            </Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <ul>
                    <li className="x">
                        <Lenke href="#">
                            <Normaltekst>Nyheter og presse</Normaltekst>
                        </Lenke>
                    </li>

                    <li>
                        <Lenke href="#">
                            <Normaltekst>Statistikk og lovdata</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="#">
                            <Normaltekst>Om NAV</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default FooterLenkeMeny;
