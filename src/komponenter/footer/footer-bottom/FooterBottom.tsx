import React, { useEffect, useState } from 'react';
import { genererLenkerTilUrl } from '../../../utils/Environment';
import BEMHelper from '../../../utils/bem';
import Tekst from '../../../tekster/finn-tekst';
import { FooterLenke, lenkerBunn } from '../Footer-lenker';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import { GACategory, triggerGaEvent } from '../../../utils/google-analytics';
import Lenke from 'nav-frontend-lenker';
import { LenkeMedGA } from '../../LenkeMedGA';

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

    const openModal = () => {
        triggerGaEvent({category: GACategory.Footer, action: `bunn/del-skjerm-open`});
        setVisDelSkjermModal(true);
    };
    const closeModal = () => {
        triggerGaEvent({category: GACategory.Footer, action: `bunn/del-skjerm-close`});
        setVisDelSkjermModal(false);
    };

    return (
        <section className={cls.element('menylinje-bottom')}>
            <div className="bottom-venstre">
                <ul>
                    {lenker.map(lenke => {
                        return (
                            <li key={lenke.lenketekst}>
                                <LenkeMedGA
                                    href={lenke.url}
                                    gaEventArgs={{category: GACategory.Footer, action: `bunn/${lenke.lenketekst}`, label: lenke.url}}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGA>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <ul className="bottom-hoyre">
                <li>
                    <Lenke
                        href="#"
                        onClick={openModal}
                    >
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
        </section>
    );
};

export default FooterBottom;
