import { configForNodeGroup } from '../../../../../utils/keyboard-navigation/kb-navigation-setup';
import { useKbNavSub } from '../../../../../utils/keyboard-navigation/useKbNavSub';
import { Toppseksjon } from './topp-seksjon/Toppseksjon';
import React from 'react';
import { HovedmenyInnholdProps } from './HovedmenyInnhold';
import KbNav, { KbNavGroup } from '../../../../../utils/keyboard-navigation/kb-navigation';
import { MenyLenkeSeksjon } from '../../common/meny-lenker/MenyLenkeSeksjon';
import { bunnLenker } from '../../../../common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import { Locale } from '../../../../../store/reducers/language-duck';
import ArbeidsflateLenkepanel from '../../../../common/arbeidsflate-lenkepanel/ArbeidsflateLenkepanel';
import { AnalyticsCategory } from '../../../../../utils/analytics/analytics';
import classNames from 'classnames';

import './HovedmenyInnholdSmall.less';

const classname = 'desktop-hovedmeny';

export const HovedmenyInnholdSmall = ({
    kbNavMainState,
    arbeidsflate,
    menyPunkter,
    language,
    isOpen,
}: HovedmenyInnholdProps) => {
    const kbConfig = configForNodeGroup[KbNavGroup.Hovedmeny];
    useKbNavSub(kbConfig, kbNavMainState, isOpen);

    const { environment } = useSelector((state: AppState) => state);

    if (!menyPunkter) {
        return null;
    }

    const arbeidsflateLenker = bunnLenker(environment)[arbeidsflate].filter((lenke) =>
        language !== Locale.BOKMAL && language !== Locale.NYNORSK ? !lenke.key : true
    );

    const arbeidsflateLenkerCol = menyPunkter.children.length;

    return (
        <div className={classNames(classname, 'hovedmeny-innhold-small')}>
            <Toppseksjon classname={classname} />
            <div className={'hovedseksjon-small'}>
                {menyPunkter.children.map((menygruppe, index) => (
                    <MenyLenkeSeksjon
                        menygruppe={menygruppe}
                        colIndex={index}
                        rowIndex={1}
                        kbNodeGroup={KbNavGroup.Hovedmeny}
                        key={menygruppe.displayName}
                    />
                ))}
                <div className={'arbeidsflater-small'}>
                    {arbeidsflateLenker.map((lenke, index) => (
                        <ArbeidsflateLenkepanel
                            lenke={lenke}
                            language={language}
                            id={KbNav.getKbId(KbNavGroup.Hovedmeny, {
                                col: arbeidsflateLenkerCol,
                                row: 1,
                                sub: index,
                            })}
                            analyticsEventArgs={{
                                context: arbeidsflate,
                                category: AnalyticsCategory.Meny,
                                action: 'arbeidsflate-valg',
                                label: lenke.key,
                            }}
                            enableCompactView={true}
                            withDescription={arbeidsflate === lenke.key}
                            key={lenke.lenkeTekstId}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
