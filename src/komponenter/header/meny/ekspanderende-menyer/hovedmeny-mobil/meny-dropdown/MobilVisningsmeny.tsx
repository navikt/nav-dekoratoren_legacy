import React from 'react';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import BEMHelper from '../../../../../../utils/bem';
import { MenyNode } from '../../../../../../reducer/menu-duck';
import { MenuValue } from '../../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../../reducer/language-duck';
import Topseksjon from './mobil-innhold/top-seksjon/Topseksjon';
import MenyIngress from './mobil-innhold/MenyIngress';
import Undermeny from './mobil-innhold/Undermeny';
import Listelement from './mobil-innhold/Listelement';
import MobilarbeidsflateValg from '../../../../arbeidsflatemeny/MobilarbeidsflateValg';
import VarselinnboksProvider from '../../../../../../provider/Varselinnboks-provider';
import Varselbjelle from '../../../varsel/Varselbjelle';
import VarselvisningMobil from '../../../varsel/varselvisning/VarselvisningMobil';
import './MobilVisningsmeny.less';

interface VisningsmenyProps {
    classname: string;
    menyLenker: MenyNode;
    togglemenu: () => void;
    menuIsOpen: boolean;
    arbeidsflate: MenuValue;
    lang: Language;
}

interface State {
    className: string;
    lenker: MenyNode;
    toggleundermeny: boolean;
    togglevarsel: boolean;
}

class MobilVisningsmeny extends React.Component<VisningsmenyProps, State> {
    private visningslenker = this.props.menyLenker.children.map(() =>
        React.createRef<HTMLAnchorElement>()
    );

    private node: any;

    constructor(props: VisningsmenyProps) {
        super(props);

        this.state = {
            className: '',
            lenker: this.props.menyLenker.children[0],
            toggleundermeny: false,
            togglevarsel: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<VisningsmenyProps>): void {
        if (!this.props.menuIsOpen && prevProps.menuIsOpen) {
            this.setState({
                toggleundermeny: this.props.menuIsOpen,
                togglevarsel: this.props.menuIsOpen,
            });
        }
    }

    lukkMenyene = () => {
        this.props.togglemenu();
    };

    lukkUnderMeny = () => {
        this.toggleundermeny();
        this.focusNode();
    };

    toggleundermeny = () => {
        this.setState({ toggleundermeny: !this.state.toggleundermeny });
    };

    togglevarsel = () => {
        this.setState({ togglevarsel: !this.state.togglevarsel });
    };

    sideSeksjonIsTabable = (): boolean => {
        return !this.state.togglevarsel && this.state.toggleundermeny;
    };

    hovedseksjonTabIndex = (): boolean => {
        return (
            this.props.menuIsOpen &&
            !this.state.togglevarsel &&
            !this.state.toggleundermeny
        );
    };

    underseksjonTabIndex = (): boolean => {
        return this.props.menuIsOpen && this.sideSeksjonIsTabable();
    };

    setMenyliste = (
        event: React.MouseEvent<HTMLAnchorElement>,
        meny: MenyNode,
        pointer: any
    ) => {
        event.preventDefault();
        this.node = pointer;

        this.setState(
            {
                lenker: meny,
            },
            () => this.toggleundermeny()
        );
    };

    focusNode = () => {
        this.node.focus();
    };

    render(): React.ReactNode {
        const {
            classname,
            menyLenker,
            menuIsOpen,
            togglemenu,
            arbeidsflate,
            lang,
        } = this.props;
        const menyClass = BEMHelper(classname);

        return (
            <>
                <section className={menyClass.element('startmeny')}>
                    <Topseksjon
                        lukkmeny={togglemenu}
                        tabindex={this.hovedseksjonTabIndex()}
                    />
                    <div
                        className={menyClass.element(
                            'minside-rad',
                            arbeidsflate === MenuValue.PRIVATPERSON
                                ? ''
                                : 'sett-rad-midt'
                        )}
                    >
                        <>
                            <VarselinnboksProvider>
                                <Varselbjelle>
                                    {(clicked, handleClick) => (
                                        <VarselvisningMobil
                                            visvarsel={clicked}
                                            visningmenyClassname={
                                                menyClass.className
                                            }
                                            togglevarselmeny={this.togglevarsel}
                                            lukkvarselmeny={
                                                handleClick
                                                    ? handleClick
                                                    : () => void 0
                                            }
                                            tabindex={
                                                menuIsOpen &&
                                                clicked &&
                                                !this.state.toggleundermeny
                                            }
                                            clicked={this.state.toggleundermeny}
                                            lukkmenyene={this.lukkMenyene}
                                            menuIsOpen={menuIsOpen}
                                        />
                                    )}
                                </Varselbjelle>
                            </VarselinnboksProvider>
                        </>
                        {/*<MinsideLenke tabindex={this.hovedseksjonTabIndex()} />*/}
                    </div>
                    <MenyIngress
                        className={menyClass.element('meny', 'ingress')}
                    />
                    <ul className={menyClass.element('meny', 'list')}>
                        {menyLenker.children.map(
                            (menyElement: MenyNode, index: number) => {
                                return (
                                    <a
                                        className="lenke"
                                        ref={this.visningslenker[index]}
                                        key={index}
                                        href="https://nav.no"
                                        onClick={event =>
                                            this.setMenyliste(
                                                event,
                                                menyElement,
                                                this.visningslenker[index]
                                                    .current
                                            )
                                        }
                                        tabIndex={
                                            this.hovedseksjonTabIndex() ? 0 : -1
                                        }
                                    >
                                        <Listelement
                                            className={menyClass.className}
                                            classElement="text-element"
                                        >
                                            {menyElement.displayName}
                                            <HoyreChevron />
                                        </Listelement>
                                    </a>
                                );
                            }
                        )}
                    </ul>
                    {lang === Language.NORSK && (
                        <MobilarbeidsflateValg
                            tabindex={this.hovedseksjonTabIndex()}
                        />
                    )}
                </section>
                <Undermeny
                    className={menyClass.className}
                    clicked={this.state.toggleundermeny}
                    lukkMenyene={this.lukkMenyene}
                    lukkMeny={this.lukkUnderMeny}
                    tabindex={this.underseksjonTabIndex()}
                    lenker={this.state.lenker}
                />
            </>
        );
    }
}

export default MobilVisningsmeny;
