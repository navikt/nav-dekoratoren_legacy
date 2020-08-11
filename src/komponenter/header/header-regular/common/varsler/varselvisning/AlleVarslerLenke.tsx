import React from 'react';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';

import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { GACategory } from 'utils/google-analytics';
import Tekst from 'tekster/finn-tekst';

interface Props {
    nyeVarslerMsg: string;
    varselInnboksUrl: string;
    rowIndex?: number;
}

const AlleVarslerLenke = (props: Props) => {
    return (
        <div className="dekorator-vis-alle-lenke">
            <LenkeMedGA
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
                gaEventArgs={{
                    category: GACategory.Header,
                    action: 'varsler/visalle',
                    label: props.varselInnboksUrl,
                }}
            >
                <Tekst id={'varsler-visalle'} />
                {props.nyeVarslerMsg}
            </LenkeMedGA>
        </div>
    );
};

export default AlleVarslerLenke;
