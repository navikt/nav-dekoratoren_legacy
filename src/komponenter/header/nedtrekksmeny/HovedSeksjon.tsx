import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../../utils/bem';

const HovedSeksjon = ({ className }: { className: string }) => {
    const cls = BEMHelper(className);

    return (
        <div className={cls.element('hovedSeksjon')}>
            <section className={cls.element('seksjon')}>
                <div className={cls.element('seksjonOverskrift')}>
                    <Element>Arbeidssøker</Element>
                </div>
                <ul>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Mistet jobben</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Mistet jobben</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Skiftet yrke</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Se flere</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <div className={cls.element('seksjonOverskrift')}>
                    <Element>Syk</Element>
                </div>
                <ul>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Sykemeldt</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Vil prøve å jobbe litt</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Se flere</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <div className={cls.element('seksjonOverskrift')}>
                    <Element>Pensjon</Element>
                </div>
                <ul>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Hva vil jeg få i pensjon</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Søke alderpensjon</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Se flere</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <div className={cls.element('seksjonOverskrift')}>
                    <Element>Familie og barn</Element>
                </div>
                <ul>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>
                                Venter barn eller nylig fått barn
                            </Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Bli gift eller samboer</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Se flere</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <div className={cls.element('seksjonOverskrift')}>
                    <Element>Sosiale tjenester</Element>
                </div>
                <ul>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>
                                Penger til mat, husleie og slikt
                            </Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>
                                Sted å bo det neste døgnet
                            </Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Se flere</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <div className={cls.element('seksjonOverskrift')}>
                    <Element>Nedsatt funksjonsevne</Element>
                </div>
                <ul>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>
                                Tolketjenesten for tegnspråket
                            </Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Lese- og skrivevansker</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Se flere</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className={cls.element('seksjon')}>
                <div className={cls.element('seksjonOverskrift')}>
                    <Element>Internasjonalt</Element>
                </div>
                <ul>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Arbeid</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Helse</Normaltekst>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="javascript:void(0)">
                            <Normaltekst>Se flere</Normaltekst>
                        </Lenke>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default HovedSeksjon;
