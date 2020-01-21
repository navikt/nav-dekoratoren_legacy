import React, { useState, useEffect } from 'react';
import Lenke from 'nav-frontend-lenker';
import { genererLenkerTilUrl } from '../../../utils/Environment';
import BEMHelper from '../../../utils/bem';
import Tekst from '../../../tekster/finn-tekst';
import { FooterLenke, lenkerBunn } from '../Footer-lenker';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';

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
                                <Lenke href={lenke.url}>
                                    {lenke.lenketekst}
                                </Lenke>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <ul className="bottom-hoyre">
                <li>
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
        </section>
    );
};

export default FooterBottom;
