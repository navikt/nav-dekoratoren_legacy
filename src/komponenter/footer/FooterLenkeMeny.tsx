import React from 'react';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../utils/bem';
import { Language } from '../../reducer/language-duck';
import NavLogoFooter from '../../ikoner/meny/NavLogoFooter';
import { erNavDekoratoren } from '../../utils/environments';

interface Props {
    className: string;
    language: Language;
}

interface State {
    hasMounted: boolean;
    erNavDekoratoren: boolean;
    languages: LanguageSelectors[];
}

interface LanguageSelectors {
    url: string;
    testurl: string;
    text: string;
    lang: Language;
}

class FooterLenkeMeny extends React.Component<Props, State> {
    lang = [
        {
            url: 'https://www.nav.no/Forsiden',
            testurl: '/person/nav-dekoratoren/person/no/',
            text: 'Norske sider',
            lang: Language.NORSK,
        },
        {
            url: 'https://www.nav.no/en/Home',
            testurl: '/person/nav-dekoratoren/person/en/',
            text: 'English pages',
            lang: Language.ENGELSK,
        },
        {
            url: 'https://www.nav.no/se/Samegiella',
            testurl: '/person/nav-dekoratoren/person/se/',
            text: 'Sámegiel skovit',
            lang: Language.SAMISK,
        },
    ];
    constructor(props: Props) {
        super(props);

        this.state = {
            hasMounted: false,
            erNavDekoratoren: false,
            languages: [this.lang[1], this.lang[2]],
        };
    }

    componentDidMount(): void {
        this.setState(
            {
                hasMounted: true,
            },
            () => {
                if (this.state.hasMounted) {
                    this.setState({
                        erNavDekoratoren: erNavDekoratoren(),
                        languages: this.getLanguage(),
                    });
                }
            }
        );
    }

    getLanguage = () => {
        const nonSelectedLang = this.lang;
        switch (this.props.language) {
            case Language.NORSK:
                return nonSelectedLang.splice(1, 3);
            case Language.ENGELSK:
                nonSelectedLang.splice(1, 1);
                return nonSelectedLang;
            case Language.SAMISK:
                return nonSelectedLang.splice(0, 2);
            default:
                return nonSelectedLang.splice(1, 3);
        }
    };

    render() {
        const { className } = this.props;
        const cls = BEMHelper(className);

        return (
            <footer className="sitefooter" role="contentinfo">
                <div className={cls.element('innhold')}>
                    <section className={cls.element('menylenker-seksjon')}>
                        <ul>
                            <li>
                                <Lenke href="#">Kontakt oss</Lenke>
                            </li>

                            {this.state.languages.map(lenke => {
                                return (
                                    <li key={lenke.lang}>
                                        <Lenke
                                            href={
                                                this.state.erNavDekoratoren
                                                    ? lenke.testurl
                                                    : lenke.url
                                            }
                                        >
                                            {lenke.text}
                                        </Lenke>
                                    </li>
                                );
                            })}
                            <li>
                                <Lenke href="#">
                                    Del skjerm med kontaktsenteret
                                </Lenke>
                            </li>
                        </ul>
                    </section>

                    <section className={cls.element('menylenker-seksjon')}>
                        <ul>
                            <li className="x">
                                <Lenke href="#">Klage og tilbakemelding</Lenke>
                            </li>
                            <li className="x">
                                <Lenke href="#">Tilgjengelighet</Lenke>
                            </li>
                            <li className="x">
                                <Lenke href="#">Lover og regler</Lenke>
                            </li>
                            <li>
                                <Lenke href="#">Personvern</Lenke>
                            </li>
                        </ul>
                    </section>

                    <section className={cls.element('menylenker-seksjon')}>
                        <ul>
                            <li>
                                <Lenke href="#">Om NAV</Lenke>
                            </li>
                            <li className="x">
                                <Lenke href="#">Nyheter fra NAV</Lenke>
                            </li>

                            <li className="x">
                                <Lenke href="#">For pressen</Lenke>
                            </li>

                            <li>
                                <Lenke href="#">Forskning og statistikk</Lenke>
                            </li>
                        </ul>
                    </section>
                    <NavLogoFooter
                        width="65"
                        height="65"
                        classname={cls.element('svg')}
                    />
                </div>
            </footer>
        );
    }
}
export default FooterLenkeMeny;
