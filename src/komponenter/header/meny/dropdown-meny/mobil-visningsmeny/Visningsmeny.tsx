import React from 'react';
import { MenySeksjon } from '../../../../../reducer/menu-duck';
import BEMHelper from '../../../../../utils/bem';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Topseksjon from './top-seksjon/Topseksjon';
import './Visningsmeny.less';
import Listelement from './liste-element/Listelement';
import Lukkundermeny from './lukk-undermeny/Lukkundermeny';
import MenyIngress from './meny-ingress/MenyIngress';

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
        const { classname, menyLenker } = this.props;
        const slideoutMeny = BEMHelper(classname);

        return (
            <>
                <section className={slideoutMeny.element('startmeny')}>
                    <Topseksjon
                        lukkmeny={this.props.closeButton}
                        viewIndex={this.props.viewIndex}
                    />
                    <MenyIngress
                        className={slideoutMeny.element('meny', 'ingress')}
                    />
                    <ul className={slideoutMeny.element('meny', 'list')}>
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
                                        <Listelement
                                            className={slideoutMeny.className}
                                        >
                                            {menyElement.displayName}
                                            <HoyreChevron />
                                        </Listelement>
                                    </Lenke>
                                );
                            }
                        )}
                    </ul>
                </section>
                <section
                    className={slideoutMeny.element(
                        'undermeny-innhold',
                        this.state.clicked ? 'active' : ''
                    )}
                >
                    <Topseksjon
                        lukkmeny={this.lukkMenyer}
                        viewIndex={this.state.clicked}
                    />

                    <Lukkundermeny
                        lukkundermeny={this.lukkMeny}
                        className={slideoutMeny.className}
                    />
                    <ul className={slideoutMeny.element('meny', 'list')}>
                        {this.state.lenker.children.map(
                            (lenke, index: number) => {
                                return (
                                    <Lenke href={lenke.path} key={index}>
                                        <Listelement
                                            className={slideoutMeny.className}
                                        >
                                            <HoyreChevron />
                                            {lenke.displayName}
                                        </Listelement>
                                    </Lenke>
                                );
                            }
                        )}
                    </ul>
                </section>
            </>
        );
    }
}

export default Visningsmeny;
