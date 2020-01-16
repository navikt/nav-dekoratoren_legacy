import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { genererUrl } from '../../utils/Environment';
import BEMHelper from '../../utils/bem';
import { LanguageSelectors } from './Footer-utils';
import { lenkerHoyre, lenkerVenstre } from './FooterLenker';
import NavLogoFooter from '../../ikoner/meny/NavLogoFooter';
import Tekst from '../../tekster/finn-tekst';

interface Props {
    classname: string;
    languages: LanguageSelectors[];
    erNavDekoratoren: boolean;
}

const MenylinjeTopp = ({ classname, languages, erNavDekoratoren }: Props) => {
    const cls = BEMHelper(classname);
    return (
        <section className={cls.element('menylinje-topp')}>
            <div className="menylenker-seksjon logo">
                <NavLogoFooter
                    width="65"
                    height="65"
                    classname={cls.element('svg')}
                />
            </div>
            <div className="menylenker-seksjon venstre">
                <ul>
                    <li>
                        <Undertittel>
                            <Tekst id="footer-hjelp-overskrift" />
                        </Undertittel>
                    </li>
                    {lenkerVenstre.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <Lenke href={genererUrl(lenke.url)}>
                                    {lenke.lenketekst}
                                </Lenke>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="menylenker-seksjon midt">
                <ul>
                    <li>
                        <Undertittel>
                            <Tekst id="footer-languages-overskrift" />
                        </Undertittel>
                    </li>
                    {languages.map(lenke => {
                        return (
                            <li key={lenke.lang}>
                                <Lenke
                                    href={
                                        erNavDekoratoren
                                            ? lenke.testurl
                                            : genererUrl(lenke.url)
                                    }
                                >
                                    {lenke.lenketekst}
                                </Lenke>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="menylenker-seksjon hoyre">
                <ul>
                    <li>
                        <Undertittel className="tilgjengelighet-overskrift">
                            <Tekst id="footer-tilgjengelighet-overskrift" />
                        </Undertittel>
                        <Normaltekst className="tilgjengelighet-ingress">
                            <Tekst id="footer-tilgjengelighet-ingress" />
                        </Normaltekst>
                    </li>
                    {lenkerHoyre.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <Lenke href={genererUrl(lenke.url)}>
                                    {lenke.lenketekst}
                                </Lenke>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default MenylinjeTopp;
