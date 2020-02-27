import React, { useEffect, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../../utils/bem';
import Tekst from '../../../tekster/finn-tekst';
import { genererLenkerTilUrl } from '../../../utils/Environment';
import { FooterLenke, lenkerHoyre, lenkerVenstre } from '../Footer-lenker';
import Spraakvalg from './Spraakvalg';
import { GACategory, triggerGaEvent } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';

interface Props {
    classname: string;
}

const FooterTopp = ({ classname }: Props) => {
    const [venstrelenker, setVenstrelenker] = useState<FooterLenke[]>(
        lenkerVenstre
    );
    const [hoyrelenker, setHoyrelenker] = useState<FooterLenke[]>(lenkerHoyre);
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);

    useEffect(() => {
        setVenstrelenker(genererLenkerTilUrl(lenkerVenstre));
        setHoyrelenker(genererLenkerTilUrl(lenkerHoyre));
    }, []);

    const cls = BEMHelper(classname);

    const openModal = () => {
        triggerGaEvent({
            category: GACategory.Footer,
            action: `bunn/del-skjerm-open`,
        });
        setVisDelSkjermModal(true);
    };
    const closeModal = () => {
        triggerGaEvent({
            category: GACategory.Footer,
            action: `bunn/del-skjerm-close`,
        });
        setVisDelSkjermModal(false);
    };

    return (
        <section className={cls.element('menylinje-topp')}>
            <div className="menylenker-seksjon venstre">
                <Undertittel className="blokk-xxs">
                    <Tekst id={'footer-kontakt-overskrift'} />
                </Undertittel>
                <ul>
                    {venstrelenker.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <HoyreChevron />
                                <LenkeMedGA
                                    href={lenke.url}
                                    gaEventArgs={{
                                        category: GACategory.Footer,
                                        action: `hjelp/${lenke.lenketekst}`,
                                        label: lenke.url,
                                    }}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGA>
                            </li>
                        );
                    })}
                    <li>
                        <HoyreChevron />
                        <Lenke href="#" onClick={openModal}>
                            <Tekst id="footer-del-skjerm" />
                        </Lenke>
                        {visDelSkjermModal && (
                            <DelSkjermModal
                                isOpen={visDelSkjermModal}
                                onClose={closeModal}
                            />
                        )}
                    </li>
                </ul>
            </div>
            <div className="menylenker-seksjon midt">
                <Spraakvalg />
            </div>
            <div className="menylenker-seksjon hoyre">
                <Undertittel className="nav-samfunn-overskrift blokk-xxs">
                    <Tekst id="footer-navsamfunn-overskrift" />
                </Undertittel>
                <ul>
                    {hoyrelenker.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <HoyreChevron />
                                <LenkeMedGA
                                    href={lenke.url}
                                    gaEventArgs={{
                                        category: GACategory.Footer,
                                        action: `om-nettstedet/${lenke.lenketekst}`,
                                        label: lenke.url,
                                    }}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGA>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default FooterTopp;
