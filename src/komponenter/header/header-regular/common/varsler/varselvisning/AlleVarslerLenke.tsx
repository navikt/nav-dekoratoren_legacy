import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';

import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import Tekst from 'tekster/finn-tekst';

interface Props {
    varselInnboksUrl: string;
    rowIndex?: number;
}

const AlleVarslerLenke = (props: Props) => {
    return (
        <div className="dekorator-vis-alle-lenke">
            <LenkeMedSporing
                classNameOverride="vis-alle-lenke"
                href={props.varselInnboksUrl}
                id={
                    props.rowIndex !== undefined
                        ? getKbId(KbNavGroup.Varsler, {
                              col: 0,
                              row: props.rowIndex,
                              sub: 0,
                          })
                        : undefined
                }
                analyticsEventArgs={{
                    category: AnalyticsCategory.Header,
                    action: 'varsler/visalle',
                    label: props.varselInnboksUrl,
                }}
            >
                <Tekst id={'varsler-visalle'} />
            </LenkeMedSporing>
        </div>
    );
};

export default AlleVarslerLenke;
