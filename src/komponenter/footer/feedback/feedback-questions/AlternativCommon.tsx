import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';
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

export const KontaktOss = (props: { href: string }) => (
    <>
        <Tekst id="kontakt-oss-start" />
        <Lenke href={props.href}>
            <Tekst id="kontakt-oss-lenketekst" />
        </Lenke>
        <Tekst id="kontakt-oss-slutt" />
    </>
);

export const FeedbackInformasjon = React.memo(() => {
    const { environment, arbeidsflate } = useSelector((state: AppState) => state);
    const kontaktOssUrl =
        arbeidsflate.status === MenuValue.ARBEIDSGIVER
            ? 'https://arbeidsgiver.nav.no/kontakt-oss'
            : `${environment.XP_BASE_URL}/person/kontakt-oss`;

    return (
        <>
            <Normaltekst>
                <Tekst id="advarsel-om-personopplysninger" />
            </Normaltekst>
            <Normaltekst>
                <KontaktOss href={kontaktOssUrl} />
            </Normaltekst>
        </>
    );
});
