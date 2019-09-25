import React from 'react';
import Lenke from 'nav-frontend-lenker';
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
                            <Lenke href="#">Kontakt oss</Lenke>
                        </li>
                        {!(language === Language.NORSK) && (
                            <li>
                                <Lenke href="/person/nav-dekoratoren/person/no/">
                                    Norske sider
                                </Lenke>
                            </li>
                        )}
                        {!(language === Language.ENGELSK) && (
                            <li>
                                <Lenke href="/person/nav-dekoratoren/person/en/">
                                    English pages
                                </Lenke>
                            </li>
                        )}
                        {!(language === Language.SAMISK) && (
                            <li>
                                <Lenke href="/person/nav-dekoratoren/person/se/">
                                    Sámegiel skovit
                                </Lenke>
                            </li>
                        )}
                        <li>
                            <Lenke href="#">
                                Del skjerm med kontaktsenteret
                            </Lenke>
                        </li>
                    </ul>
                </section>

                <section className={cls.element('seksjon midt')}>
                    <ul>
                        <li className="x">
                            <Lenke href="#">Klage og tilbakemelding</Lenke>
                        </li>

                        <li className="x">
                            <Lenke href="#">Tilgjengelighet</Lenke>
                        </li>
                        <li className="x">
                            <Lenke href="#">Lover og regler</Lenke>
                        </li>
                        <li>
                            <Lenke href="#">Personvern</Lenke>
                        </li>
                    </ul>
                </section>

                <section className={cls.element('seksjon hoyre')}>
                    <ul>
                        <li>
                            <Lenke href="#">Om NAV</Lenke>
                        </li>
                        <li className="x">
                            <Lenke href="#">Nyheter fra NAV</Lenke>
                        </li>

                        <li className="x">
                            <Lenke href="#">For pressen</Lenke>
                        </li>

                        <li>
                            <Lenke href="#">
                                Forskning, statistikk og analyse
                            </Lenke>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    );
};

export default FooterLenkeMeny;
