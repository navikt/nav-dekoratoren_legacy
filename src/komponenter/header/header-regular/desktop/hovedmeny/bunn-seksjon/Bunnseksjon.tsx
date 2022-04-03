import React from 'react';
import BEMHelper from 'utils/bem';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { MenuValue } from 'utils/meny-storage-utils';
import { Locale } from 'store/reducers/language-duck';
import { bunnLenker } from 'komponenter/common/arbeidsflate-lenker/hovedmeny-arbeidsflate-lenker';
import { ArbeidsflateLenke } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import ArbeidsflateLenkepanel from 'komponenter/common/arbeidsflate-lenkepanel/ArbeidsflateLenkepanel';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import './Bunnseksjon.less';

interface Props {
    classname: string;
    arbeidsflate: MenuValue;
    language: Locale;
}

export const Bunnseksjon = ({ classname, language, arbeidsflate }: Props) => {
    const cls = BEMHelper(classname);
    const { environment } = useSelector((state: AppState) => state);
    const lenker = bunnLenker(environment)[arbeidsflate] as ArbeidsflateLenke[];

    return (
        <div className={cls.element('bunn-seksjon')}>
            {lenker
                .filter((lenke) => (language !== Locale.BOKMAL && language !== Locale.NYNORSK ? !lenke.key : true))
                .map((lenke, index) => (
                    <ArbeidsflateLenkepanel
                        lenke={lenke}
                        language={language}
                        id={KbNav.getKbId(KbNavGroup.Hovedmeny, {
                            col: index,
                            row: 2,
                            sub: 0,
                        })}
                        analyticsEventArgs={{
                            context: arbeidsflate,
                            category: AnalyticsCategory.Meny,
                            action: 'arbeidsflate-valg',
                            label: lenke.key,
                        }}
                        enableCompactView={true}
                        key={lenke.lenkeTekstId}
                    />
                ))}
        </div>
    );
};
