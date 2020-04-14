import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { erNavDekoratoren } from 'utils/Environment';
import { Spraaklenke, spraaklenker } from './Spraakvalg-lenker';
import { getSpraaklenker } from './Spraakvalg-lenker';
import Tekst from 'tekster/finn-tekst';

const Spraakvalg = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [erDekoratoren, setErDekoratoren] = useState<boolean>(false);
    const [spraklenker, setSpraklenker] = useState<Spraaklenke[]>([
        spraaklenker[1],
        spraaklenker[2],
    ]);

    useEffect(() => {
        setErDekoratoren(erNavDekoratoren());
        setSpraklenker(getSpraaklenker(XP_BASE_URL, language));
    }, []);

    return (
        <>
            <Undertittel
                className="menylenker-overskrift"
                id="spraaklenker-overskrift"
            >
                <Tekst id="footer-languages-overskrift" />
            </Undertittel>
            <ul aria-labelledby="spraaklenker-overskrift">
                {spraklenker.map(lenke => (
                    <li key={lenke.lang}>
                        <Normaltekst>
                            <LenkeMedGA
                                href={erDekoratoren ? lenke.testurl : lenke.url}
                                gaEventArgs={{
                                    category: GACategory.Footer,
                                    action: `språkvalg/${lenke.lang}`,
                                }}
                            >
                                {lenke.lenketekst}
                            </LenkeMedGA>
                        </Normaltekst>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Spraakvalg;
