import React from 'react';
import { MenySeksjon } from '../../../../../reducer/menu-duck';
import BEMHelper from '../../../../../utils/bem';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Topseksjon from './mobil-innhold/top-seksjon/Topseksjon';
import './MobilVisningsmeny.less';
import Listelement from './mobil-innhold/Listelement';
import MenyIngress from './mobil-innhold/MenyIngress';
import MobilarbeidsflateValg from '../../../arbeidsflatemeny/MobilarbeidsflateValg';
import Varselbjelle from '../../varsel/Varselbjelle';
import VarselinnboksProvider from '../../../../../provider/Varselinnboks-provider';
import MinsideLenke from '../../minside-lenke/MinsideLenke';
import Undermeny from './mobil-innhold/Undermeny';
import VarselvisningMobil from '../../varsel/varsel-visning/VarselvisningMobil';
import { MenuValue } from '../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../reducer/language-duck';

interface VisningsmenyProps {
    classname: string;
    menyLenker: MenySeksjon;
    closeButton: () => void;
    viewIndex: boolean;
    arbeidsflate: MenuValue;
    lang: Language;
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
        const menyClass = BEMHelper(classname);

        return (
            <>
                <section className={menyClass.element('startmeny')}>
                    <Topseksjon
                        lukkmeny={this.props.closeButton}
                        viewIndex={viewIndex}
                    />
                    <div
                        className={menyClass.element(
                            'minside-rad',
                            this.props.arbeidsflate === MenuValue.PRIVATPERSON
                                ? ''
                                : 'sett-rad-midt'
                        )}
                    >
                        <VarselinnboksProvider>
                            <Varselbjelle>
                                {(clicked, handleClick) => (
                                    <VarselvisningMobil
                                        visvarsel={clicked}
                                        visningmenyClassname={
                                            menyClass.className
                                        }
                                        lukkvarselmeny={
                                            handleClick
                                                ? handleClick
                                                : () => void 0
                                        }
                                        viewIndex={viewIndex}
                                        clicked={this.state.clicked}
                                        lukkmenyene={this.lukkMenyer}
                                    />
                                )}
                            </Varselbjelle>
                        </VarselinnboksProvider>
                        <MinsideLenke />
                    </div>
                    <MenyIngress
                        className={menyClass.element('meny', 'ingress')}
                    />
                    <ul className={menyClass.element('meny', 'list')}>
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
                                        tabIndex={viewIndex ? 0 : -1}
                                    >
                                        <Listelement
                                            className={menyClass.className}
                                            classElement="text-element"
                                        >
                                            {menyElement.displayName}
                                            <HoyreChevron />
                                        </Listelement>
                                    </Lenke>
                                );
                            }
                        )}
                    </ul>
                    {this.props.lang === Language.NORSK && (
                        <MobilarbeidsflateValg />
                    )}
                </section>
                <Undermeny
                    className={menyClass.className}
                    clicked={this.state.clicked}
                    lukkMenyene={this.lukkMenyer}
                    lukkMeny={this.lukkMeny}
                    viewIndex={viewIndex}
                    lenker={this.state.lenker}
                />
            </>
        );
    }
}

export default Visningsmeny;
