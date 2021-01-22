import React from 'react';
import Tekst from 'tekster/finn-tekst';
import Lenke from 'nav-frontend-lenker';
import { FeedbackState } from '../Feedback';
import { useSelector } from 'react-redux';
import { MenuValue } from 'utils/meny-storage-utils';
import { AppState } from 'store/reducers';
import './Alternativ.less';

export const questionStateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language,
});

export interface QuestionProps {
    settBesvart: () => void;
    state: FeedbackState;
}

export const KontaktOss = React.memo(() => {
    const { environment, arbeidsflate } = useSelector((state: AppState) => state);
    const kontaktOssUrl =
        arbeidsflate.status === MenuValue.ARBEIDSGIVER
            ? 'https://arbeidsgiver.nav.no/kontakt-oss'
            : `${environment.XP_BASE_URL}/person/kontakt-oss`;

    return (
        <>
            <Tekst id="kontakt-oss-start" />
            <Lenke href={kontaktOssUrl}>
                <Tekst id="kontakt-oss-lenketekst" />
            </Lenke>
            <Tekst id="kontakt-oss-slutt" />
        </>
    );
});
