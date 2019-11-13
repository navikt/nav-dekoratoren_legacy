import React from 'react';
import { MenySeksjon } from '../../../../../reducer/menu-duck';
import BEMHelper from '../../../../../utils/bem';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Tekst from '../../../../../tekster/finn-tekst';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import TopSeksjon from './top-seksjon/TopSeksjon';

interface VisningsmenyProps {
    classname: string;
    menyLenker: MenySeksjon;
    viewIndex: boolean;
    closeButton: () => void;
}

interface State {
    className: string;
    lenker: MenySeksjon;
    clicked: boolean;
}

class Visningsmeny extends React.Component<VisningsmenyProps, State> {
    constructor(props: VisningsmenyProps) {
        super(props);
        this.state = {
            className: '',
            lenker: this.props.menyLenker.children[0],
            clicked: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<VisningsmenyProps>): void {
        if (!this.props.viewIndex && prevProps.viewIndex) {
            this.setState({ clicked: this.props.viewIndex });
        }
    }

    lukkMenyer = () => {
        this.props.closeButton();
        this.lukkMeny();
    };

    lukkMeny = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    setMenyliste = (
        event: React.MouseEvent<HTMLAnchorElement>,
        meny: MenySeksjon
    ) => {
        event.preventDefault();
        this.setState(
            {
                lenker: meny,
            },
            () => this.lukkMeny()
        );
    };

    render(): React.ReactNode {
        const { classname, menyLenker, viewIndex } = this.props;
        const slideoutMeny = BEMHelper(classname);

        return (
            <div className={slideoutMeny.className}>
                <section className={slideoutMeny.element('seksjon')}>
                    <TopSeksjon
                        classname={slideoutMeny.className}
                        lukkmeny={this.props.closeButton}
                        viewIndex={this.props.viewIndex}
                    />
                    <div className={slideoutMeny.element('seksjon', 'ingress')}>
                        <Innholdstittel>
                            <Tekst id="meny-slideut-ingress" />
                        </Innholdstittel>
                    </div>
                    <ul className={slideoutMeny.element('seksjon', 'list')}>
                        {menyLenker.children.map(
                            (menyElement: MenySeksjon, index: number) => {
                                return (
                                    <Lenke
                                        key={index}
                                        href="https://nav.no"
                                        onClick={event =>
                                            this.setMenyliste(
                                                event,
                                                menyElement
                                            )
                                        }
                                    >
                                        <li
                                            className={slideoutMeny.element(
                                                'seksjon',
                                                'listItem'
                                            )}
                                        >
                                            <Undertittel>
                                                <span
                                                    className={slideoutMeny.element(
                                                        'seksjon',
                                                        'navn'
                                                    )}
                                                >
                                                    {menyElement.displayName}
                                                    <HoyreChevron />
                                                </span>
                                            </Undertittel>
                                        </li>
                                    </Lenke>
                                );
                            }
                        )}
                    </ul>
                </section>
                <section
                    className={slideoutMeny.element(
                        'undermeny',
                        this.state.clicked ? 'active' : ''
                    )}
                >
                    <TopSeksjon
                        classname={slideoutMeny.className}
                        lukkmeny={this.lukkMenyer}
                        viewIndex={this.state.clicked}
                    />
                    <div className={slideoutMeny.element('tilbakeknapp')}>
                        <Innholdstittel
                            className={slideoutMeny.element(
                                'meny',
                                'tilbakeknapp'
                            )}
                        >
                            <Lenke
                                href="https://nav.no"
                                onClick={event => {
                                    event.preventDefault();
                                    this.lukkMeny();
                                }}
                            >
                                <VenstreChevron />
                                Tilbake til oversikt
                            </Lenke>
                        </Innholdstittel>
                    </div>
                    <ul className={slideoutMeny.element('meny', 'list')}>
                        {this.state.lenker.children.map(
                            (lenke, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className={slideoutMeny.element(
                                            'meny',
                                            'listItem'
                                        )}
                                    >
                                        <Lenke href={lenke.path}>
                                            <Undertittel>
                                                <HoyreChevron />
                                                {lenke.displayName}
                                            </Undertittel>
                                        </Lenke>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </section>
            </div>
        );
    }
}

export default Visningsmeny;
