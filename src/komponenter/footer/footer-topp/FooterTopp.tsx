import React, { useEffect, useState } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import Tekst from '../../../tekster/finn-tekst';
import { genererLenkerTilUrl } from '../../../utils/Environment';
import { FooterLenke, lenkerHoyre, lenkerVenstre } from '../Footer-lenker';
import NavLogoFooter from '../../../ikoner/meny/NavLogoFooter';
import Spraakvalg from './Spraakvalg';
import LenkeMedGAEvent from '../../../utils/LenkeMedGAEvent';
import { GACategory } from '../../../utils/google-analytics';

interface Props {
    classname: string;
}

const FooterTopp = ({ classname }: Props) => {
    const [venstrelenker, setVenstrelenker] = useState<FooterLenke[]>(
        lenkerVenstre
    );
    const [hoyrelenker, setHoyrelenker] = useState<FooterLenke[]>(lenkerHoyre);

    useEffect(() => {
        setVenstrelenker(genererLenkerTilUrl(lenkerVenstre));
        setHoyrelenker(genererLenkerTilUrl(lenkerHoyre));
    }, []);

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
                <Undertittel className="blokk-xxs">
                    <Tekst id={'footer-hjelp-overskrift'} />
                </Undertittel>
                <ul>
                    {venstrelenker.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <LenkeMedGAEvent
                                    className={'lenke'}
                                    href={lenke.url}
                                    gaEventArgs={{category: GACategory.Footer, action: `hjelp/${lenke.lenketekst}`, label: lenke.url}}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGAEvent>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="menylenker-seksjon midt">
                <Spraakvalg />
            </div>
            <div className="menylenker-seksjon hoyre">
                <Undertittel className="tilgjengelighet-overskrift blokk-xxs">
                    <Tekst id="footer-tilgjengelighet-overskrift" />
                </Undertittel>
                <Normaltekst className="tilgjengelighet-ingress">
                    <Tekst id="footer-tilgjengelighet-ingress" />
                </Normaltekst>
                <ul>
                    {hoyrelenker.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <LenkeMedGAEvent
                                    className={'lenke'}
                                    href={lenke.url}
                                    gaEventArgs={{category: GACategory.Footer, action: `om-nettstedet/${lenke.lenketekst}`, label: lenke.url}}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGAEvent>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default FooterTopp;
