import React, {ReactElement} from 'react';

interface Props {
html: ReactElement<any>;
}

const VarselVisning: React.FunctionComponent<Props> = props => {
    return (
        <div id="varsler-display" className="varsler-display open" aria-expanded="true">
            {props.html}
            <div className="vis-alle-lenke skillelinje-topp">
                <a href="https://www-q0.nav.no/person/varselinnboks">Vis alle dine varsler </a>
            </div>
        </div>
    );
};
export default VarselVisning;

/*
style="top: 196.363px; right: 163.1px; left: auto;" data-hj-masked=""
<div className="panel nav-varsler">
                <ul className="varsel-liste ustilet">
                    <li className="varsel-container">
                        <section className="varsel">
                            <span className="varsel-ikon hide-text alarm">alarm-ikon</span>
                            <div className="varsel-innhold">
                                <p className="typo-normal-liten varsel-dato">27. mai 2019 kl 11:37</p>
                                <p className="typo-infotekst">Vi har fått en ny og forbedret CV-løsning og jobbprofil. Du bør gå
                                    inn i CV-en og jobbprofilen din, sjekke at alt er riktig, og fylle ut de nye feltene. Det
                                    vil øke synligheten din overfor arbeidsgivere. Du får denne meldingen fordi du ikke har vært
                                    inne i CV-en din etter at vi forbedret løsningen.</p>
                                <a className="varsel-lenke typo-normal-liten" href="https://arbeidsplassen.nav.no/minside">Les
                                    mer</a>
                            </div>
                        </section>
                    </li>
                    <li className="varsel-container">
                        <section className="varsel">
                            <span className="varsel-ikon hide-text alarm">alarm-ikon</span>
                            <div className="varsel-innhold">
                                <p className="typo-normal-liten varsel-dato">08. mai 2019 kl 14:21</p>
                                <p className="typo-infotekst">Du har mottatt et brev i Din Pensjon. Gå til Din pensjon og les
                                    brevet i innboksen</p>
                            </div>
                        </section>
                    </li>
                    <li className="varsel-container">
                        <section className="varsel">
                            <span className="varsel-ikon hide-text boble">snakkeboble-ikon</span>
                            <div className="varsel-innhold">
                                <p className="typo-normal-liten varsel-dato">02. mai 2019 kl 08:43</p>
                                <p className="typo-infotekst">Du har fått et spørsmål fra NAV</p>
                                <a className="varsel-lenke typo-normal-liten"
                                   href="https://tjenester.nav.no/mininnboks/traad/1000NEC2F">Se meldingen</a>
                            </div>
                        </section>
                    </li>
                    <li className="varsel-container">
                        <section className="varsel">
                            <span className="varsel-ikon hide-text boble">snakkeboble-ikon</span>
                            <div className="varsel-innhold">
                                <p className="typo-normal-liten varsel-dato">25. april 2019 kl 13:28</p>
                                <p className="typo-infotekst">Du har fått et spørsmål fra NAV</p>
                                <a className="varsel-lenke typo-normal-liten"
                                   href="https://tjenester.nav.no/mininnboks/traad/1000NEC2F">Se meldingen</a>
                            </div>
                        </section>
                    </li>
                    <li className="varsel-container">
                        <section className="varsel">
                            <span className="varsel-ikon hide-text boble">snakkeboble-ikon</span>
                            <div className="varsel-innhold">
                                <p className="typo-normal-liten varsel-dato">25. april 2019 kl 13:28</p>
                                <p className="typo-infotekst">Du har fått et spørsmål fra NAV</p>
                                <a className="varsel-lenke typo-normal-liten"
                                   href="https://tjenester.nav.no/mininnboks/traad/1000NEC2F">Se meldingen</a>
                            </div>
                        </section>
                    </li>
                </ul>
            </div>
 */