import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import { Language } from '../../../reducer/language-duck';

interface Props {
    className: string;
    language: Language;
}

const FooterLenkeMeny = ({ className, language }: Props) => {
    const cls = BEMHelper(className);
    return (
        <footer className="sitefooter" role="contentinfo">
            <div className="footernavsection innhold-container">
                <section className={cls.element('seksjon')}>
                    <ul>
                        {!(language === Language.NORSK) && (
                            <li>
                                <Lenke href="/person/nav-dekoratoren/no/">
                                    <Normaltekst>Norske sider</Normaltekst>
                                </Lenke>
                            </li>
                        )}
                        {!(language === Language.ENGELSK) && (
                            <li>
                                <Lenke href="/person/nav-dekoratoren/en/">
                                    <Normaltekst>English pages</Normaltekst>
                                </Lenke>
                            </li>
                        )}
                        {!(language === Language.SAMISK) && (
                            <li>
                                <Lenke href="/person/nav-dekoratoren/se/">
                                    <Normaltekst>Sámegiella</Normaltekst>
                                </Lenke>
                            </li>
                        )}
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
                                <Normaltekst>
                                    Klage og tilbakemelding
                                </Normaltekst>
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
                                    Rundskriv, forskrifter og folketrygden -
                                    Lovdata
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
        </footer>
    );
};

export default FooterLenkeMeny;
