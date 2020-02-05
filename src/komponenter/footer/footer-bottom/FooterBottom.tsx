import React, { useEffect, useState } from 'react';
import { genererLenkerTilUrl } from '../../../utils/Environment';
import BEMHelper from '../../../utils/bem';
import Tekst from '../../../tekster/finn-tekst';
import { FooterLenke, lenkerBunn } from '../Footer-lenker';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import LenkeMedGAEvent from '../../../utils/LenkeMedGAEvent';
import { GACategory } from '../../../utils/google-analytics';

interface Props {
    classname: string;
}

const FooterBottom = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);
    const [lenker, setLenker] = useState<FooterLenke[]>(lenkerBunn);

    useEffect(() => {
        setLenker(genererLenkerTilUrl(lenkerBunn));
    }, []);

    const openModal = () => setVisDelSkjermModal(true);
    const closeModal = () => setVisDelSkjermModal(false);

    return (
        <section className={cls.element('menylinje-bottom')}>
            <div className="bottom-venstre">
                <ul>
                    {lenker.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <LenkeMedGAEvent
                                    className={'lenke'}
                                    href={lenke.url}
                                    gaEventArgs={{category: GACategory.Footer, action: `bunnrad/${lenke.lenketekst}`, label: lenke.url}}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGAEvent>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <ul className="bottom-hoyre">
                <li>
                    <LenkeMedGAEvent
                        className={'lenke'}
                        href="#"
                        onClick={openModal}
                        gaEventArgs={{category: GACategory.Footer, action: `bunnrad/del-skjerm`}}
                    >
                        <Tekst id="footer-del-skjerm" />
                    </LenkeMedGAEvent>
                    {visDelSkjermModal && (
                        <DelSkjermModal
                            isOpen={visDelSkjermModal}
                            onClose={closeModal}
                        />
                    )}
                </li>
            </ul>
        </section>
    );
};

export default FooterBottom;
