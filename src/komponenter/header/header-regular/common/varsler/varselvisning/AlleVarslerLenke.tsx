import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';

import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { AnalyticsCategory } from 'utils/analytics';
import Tekst from 'tekster/finn-tekst';

interface Props {
    nyeVarslerMsg: string;
    varselInnboksUrl: string;
    rowIndex?: number;
}

const AlleVarslerLenke = (props: Props) => {
    return (
        <div className="dekorator-vis-alle-lenke">
            <LenkeMedSporing
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
                {props.nyeVarslerMsg}
            </LenkeMedSporing>
        </div>
    );
};

export default AlleVarslerLenke;
