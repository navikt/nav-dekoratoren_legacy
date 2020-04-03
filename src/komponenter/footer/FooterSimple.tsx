import React, { Fragment, useEffect, useState } from 'react';
import './FooterSimple.less';
import './Footer';
import BEMHelper from '../../utils/bem';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeMedGA } from '../LenkeMedGA';
import { GACategory } from '../../utils/google-analytics';
import { FooterLenke, lenkerBunn } from './Footer-lenker';
import { genererLenkerTilUrl } from '../../utils/Environment';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducers';
import Lenke from 'nav-frontend-lenker';
import Tekst from '../../tekster/finn-tekst';
import DelSkjermModal from './footer-topp/del-skjerm-modal/DelSkjermModal';

const cls = BEMHelper('simple-footer');

const SimpleFooter = () => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [lenker, setLenker] = useState<FooterLenke[]>(lenkerBunn);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setLenker(genererLenkerTilUrl(XP_BASE_URL, lenkerBunn));
    }, []);

    return (
        <Fragment>
            <div className={cls.element('container')}>
                <div className={cls.element('content')}>
                    {lenker.map((lenke, i) => (
                        <div className={cls.element('lenke')} key={i}>
                            <Normaltekst>
                                <LenkeMedGA
                                    href={lenke.url}
                                    gaEventArgs={{
                                        category: GACategory.Footer,
                                        action: `bunn/${lenke.lenketekst}`,
                                        label: lenke.url,
                                    }}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGA>
                            </Normaltekst>
                        </div>
                    ))}
                    <Lenke
                        href="#"
                        role="button"
                        onClick={() => setIsOpen(true)}
                    >
                        <Tekst id="footer-del-skjerm" />
                    </Lenke>
                    {isOpen && (
                        <DelSkjermModal
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default SimpleFooter;
