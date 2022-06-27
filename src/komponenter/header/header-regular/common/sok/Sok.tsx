import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import { genererUrl } from 'utils/Environment';
import cls from 'classnames';
import { Locale } from 'store/reducers/language-duck';
import { SokInput } from './sok-innhold/SokInput';
import Spinner from '../spinner/Spinner';
import { Sokeresultat } from './utils';
import SokResultater from './sok-innhold/SokResultater';
import { Environment } from 'store/reducers/environment-duck';
import Cookies from 'js-cookie';
import './Sok.less';

interface Props {
    id: string;
    isOpen: boolean;
    dropdownTransitionMs?: number;
    numResultsCallback?: (numResults: number) => void;
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
}

const stateSelector = (state: AppState) => ({
    environment: state.environment,
    language: state.language.language,
});

const setSubmitTrackerCookie = () => {
    Cookies.set('nav-search-use', Date.now().toString(), { expires: 30, domain: '.nav.no' });
};

const Sok = (props: Props) => {
    const { environment, language } = useSelector(stateSelector);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<Sokeresultat | undefined>();
    const [error, setError] = useState<string | undefined>();
    const { searchInput, setSearchInput } = props;
    const numberOfResults = 5;
    const klassenavn = cls('sok-input', {
        engelsk: language === Locale.ENGELSK,
    });

    useEffect(() => {
        if (!props.isOpen) {
            onReset();
        }
    }, [props.isOpen]);

    useEffect(() => {
        if (result && props.numResultsCallback) {
            props.numResultsCallback(Math.min(result.hits.length, numberOfResults));
        }
    }, [result]);

    const onReset = () => {
        setSearchInput('');
        setLoading(false);
        document.getElementById(props.id)?.focus();
    };

    const getSearchUrl = () => {
        const { XP_BASE_URL } = environment;
        const url = `${XP_BASE_URL}/sok?ord=${searchInput}`;
        return genererUrl(XP_BASE_URL, url);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        analyticsEvent({
            category: AnalyticsCategory.Header,
            label: searchInput,
            action: 'søk',
        });
        window.location.href = getSearchUrl();
    };

    return (
        <form
            action={getSearchUrl()} // action not used but needed for displaying search-button on iphone keyboard
            role="search"
            id={`search-form${props.id ? `-${props.id}` : ''}`}
            onSubmit={onSubmit}
        >
            <div className="sok-container">
                <div className="sok-input-resultat">
                    <SokInput
                        onChange={(value: string) => {
                            setSearchInput(value);
                            if (value.length > 2) {
                                setLoading(true);
                                fetchSearchDebounced({
                                    value,
                                    environment,
                                    setLoading,
                                    setError,
                                    setResult,
                                });
                            } else {
                                setLoading(false);
                            }
                        }}
                        className={klassenavn}
                        language={language}
                        writtenInput={searchInput}
                        onReset={onReset}
                        id={props.id}
                    />
                    {loading ? (
                        <Spinner tekstId={'spinner-sok'} />
                    ) : (
                        result &&
                        searchInput.length > 2 && (
                            <SokResultater
                                writtenInput={searchInput}
                                result={result}
                                numberOfResults={numberOfResults}
                                language={language}
                                fetchError={error}
                            />
                        )
                    )}
                </div>
            </div>
        </form>
    );
};

/* Abstraction for debounce */
interface FetchResult {
    value: string;
    environment: Environment;
    setLoading: (value: boolean) => void;
    setError: (value?: string) => void;
    setResult: (value?: any) => void;
}

const fetchSearch = (props: FetchResult) => {
    const { environment, value } = props;
    const { setLoading, setError, setResult } = props;
    const { APP_URL } = environment;
    const url = `${APP_URL}/api/sok`;
    setSubmitTrackerCookie();

    fetch(`${url}?ord=${encodeURIComponent(value)}`)
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((response) => response.json())
        .then((json) => {
            setLoading(false);
            setError(undefined);
            setResult(json);
        })
        .catch((err) => {
            setLoading(false);
            setError(err);
        });
};

const fetchSearchDebounced = debounce(fetchSearch, 500);
export default Sok;
