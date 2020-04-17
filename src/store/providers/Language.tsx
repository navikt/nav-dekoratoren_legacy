import React, { useEffect } from 'react';
import { Dispatch } from 'store/dispatch-type';
import { connect } from 'react-redux';
import { Language, languageDuck } from 'store/reducers/language-duck';

function sjekkUrl(): Language {
    const locationPath = window.location.pathname;
    if (locationPath.includes('/en/')) {
        return Language.ENGELSK;
    } else if (locationPath.includes('/se/')) {
        return Language.SAMISK;
    }
    return Language.NORSK;
}

interface OwnProps {
    children: React.ReactElement<any> | React.ReactElement[]; // tslint:disable-line:no-any
}

interface DispatchProps {
    doSettLanguage: (language: Language) => void;
}

type LanguageProviderProps = OwnProps & DispatchProps;

const LanguageProvider: React.FunctionComponent<LanguageProviderProps> = props => {
    useEffect(() => {
        props.doSettLanguage(sjekkUrl());
    }, []);

    return <>{props.children}</>;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettLanguage: language =>
        dispatch(languageDuck.actionCreator({ language: language })),
});

export default connect(null, mapDispatchToProps)(LanguageProvider);
