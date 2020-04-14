import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';

import { genererLenkerTilUrl } from '../../../../utils/Environment';
import BEMHelper from '../../../../utils/bem';
import { GACategory } from '../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../LenkeMedGA';
import Tekst from '../../../../tekster/finn-tekst';
import { FooterLenke, lenkerBunn } from '../../Footer-lenker';
import NavLogoFooter from '../../../../ikoner/meny/NavLogoFooter';
import { AppState } from '../../../../reducers/reducers';

import './footerBottom.less';

const FooterBottom = () => {
    const cls = BEMHelper('menylinje-bottom');
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [lenker, setLenker] = useState<FooterLenke[]>(lenkerBunn);

    useEffect(() => {
        setLenker(genererLenkerTilUrl(XP_BASE_URL, lenkerBunn));
    }, []);

    return (
        <section className={cls.className}>
            <div className="bottom-innhold">
                <div className="bottom-logo">
                    <NavLogoFooter
                        width="65"
                        height="65"
                        classname={cls.element('svg')}
                    />
                </div>
                <div className="bottom-lenker">
                    <Normaltekst className="bottom-tekst">
                        <Tekst id="footer-arbeids-og-veldferdsetaten" />
                    </Normaltekst>
                    <ul className="bottom-lenke">
                        {lenker.map(lenke => (
                            <li key={lenke.lenketekst}>
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
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FooterBottom;
