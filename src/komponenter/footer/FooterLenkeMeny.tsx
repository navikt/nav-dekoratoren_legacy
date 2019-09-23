import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../utils/bem';
import { Language } from '../../reducer/language-duck';

interface Props {
    className: string;
    language: Language;
}

const FooterLenkeMeny = ({ className, language }: Props) => {
    const cls = BEMHelper(className);
    return (
        <footer className="sitefooter" role="contentinfo">
            <div className="footernavsection">
                <section className={cls.element('seksjon venstre')}>
                    <ul>
                        <li>
                            <Lenke href="#">
                                <Normaltekst>Kontakt oss</Normaltekst>
                            </Lenke>
                        </li>
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
                                    <Normaltekst>Sámegiel skovit</Normaltekst>
                                </Lenke>
                            </li>
                        )}
                        <li>
                            <Lenke href="#">
                                <Normaltekst>
                                    Del skjerm med kontaktsenteret
                                </Normaltekst>
                            </Lenke>
                        </li>
                    </ul>
                </section>

                <section className={cls.element('seksjon midt')}>
                    <ul>
                        <li className="x">
                            <Lenke href="#">
                                <Normaltekst>
                                    Klage og tilbakemelding
                                </Normaltekst>
                            </Lenke>
                        </li>

                        <li className="x">
                            <Lenke href="#">
                                <Normaltekst>Tilgjengelighet</Normaltekst>
                            </Lenke>
                        </li>
                        <li className="x">
                            <Lenke href="#">
                                <Normaltekst>Lover og regler</Normaltekst>
                            </Lenke>
                        </li>
                        <li>
                            <Lenke href="#">
                                <Normaltekst>Personvern</Normaltekst>
                            </Lenke>
                        </li>
                    </ul>
                </section>

                <section className={cls.element('seksjon hoyre')}>
                    <ul>
                        <li>
                            <Lenke href="#">
                                <Normaltekst>Om NAV</Normaltekst>
                            </Lenke>
                        </li>
                        <li className="x">
                            <Lenke href="#">
                                <Normaltekst>Nyheter fra NAV</Normaltekst>
                            </Lenke>
                        </li>

                        <li className="x">
                            <Lenke href="#">
                                <Normaltekst>For pressen</Normaltekst>
                            </Lenke>
                        </li>

                        <li>
                            <Lenke href="#">
                                <Normaltekst>
                                    Forskning, statistikk og analyse
                                </Normaltekst>
                            </Lenke>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    );
};

export default FooterLenkeMeny;
