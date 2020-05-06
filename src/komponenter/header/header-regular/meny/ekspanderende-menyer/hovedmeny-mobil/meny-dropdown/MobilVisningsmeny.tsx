import React from 'react';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import BEMHelper from 'utils/bem';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { Language } from 'store/reducers/language-duck';
import MenyIngress from './mobil-innhold/MenyIngress';
import Undermeny from './mobil-innhold/Undermeny';
import Listelement from './mobil-innhold/Listelement';
import MobilarbeidsflateValg from 'komponenter/header/header-regular/arbeidsflatemeny/MobilarbeidsflateValg';
import VarselinnboksProvider from 'store/providers/Varselinnboks';
import VarselvisningMobil from '../../../varsel/varselvisning/VarselvisningMobil';
import { AppState } from 'store/reducers';
import { Dispatch } from 'store/dispatch-type';
import { connect } from 'react-redux';
import InnloggetBruker from './mobil-innhold/innloggetbruker/InnloggetBruker';
import ForsideLenke from './mobil-innhold/ForsideLenke';
import Dittnavmeny from './mobil-innhold/dittnavmeny/Dittnavmeny';
import { InnloggingsstatusState } from 'store/reducers/innloggingsstatus-duck';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
import Sok from '../../../sok/Sok';
import './MobilVisningsmeny.less';

interface DispatchProps {
    toggleVarsel: () => void;
}

interface StateProps {
    arbeidsflate: MenuValue;
    visvarsel: boolean;
    innloggingsstatus: InnloggingsstatusState;
}

interface VisningsmenyProps {
    classname: string;
    menyLenker: MenyNode;
    minsideLenker: MenyNode;
    togglemenu: () => void;
    togglehovedmenu: () => void;
    menuIsOpen: boolean;
    underMenuIsOpen: boolean;
    varslerIsOpen: boolean;
    lang: Language;
}

interface State {
    className: string;
    lenker: MenyNode;
}

type Props = VisningsmenyProps & StateProps & DispatchProps;

class MobilVisningsmeny extends React.Component<Props, State> {
    private visningslenker = this.props.menyLenker.children.map(() =>
        React.createRef<HTMLAnchorElement>()
    );
    private minsidelenkerRef = this.props.minsideLenker.children.map(() =>
        React.createRef<HTMLAnchorElement>()
    );

    private node: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            className: '',
            lenker: this.props.menyLenker.children[0],
        };
    }

    hideBackgroundOverflow = (setOverflowHidden: boolean) => {
        document.body.style.overflow =
            setOverflowHidden && window.innerWidth < 768 ? 'hidden' : 'inherit';
    };

    hovedseksjonTabIndex = (): boolean => {
        return (
            this.props.menuIsOpen &&
            this.props.underMenuIsOpen &&
            !this.props.varslerIsOpen
        );
    };

    setSubmenu = (meny: MenyNode, pointer: any) => {
        this.node = pointer;
        this.setState({ lenker: meny });
    };

    setMenyliste = (
        event: React.MouseEvent<HTMLAnchorElement>,
        meny: MenyNode,
        pointer: any
    ) => {
        event.preventDefault();
        this.props.togglemenu();
        this.node = pointer;
        this.setState({ lenker: meny });
    };

    focusNode = () => {
        this.node.focus();
    };

    render(): React.ReactNode {
        const {
            classname,
            menyLenker,
            menuIsOpen,
            visvarsel,
            arbeidsflate,
            lang,
            underMenuIsOpen,
            varslerIsOpen,
            minsideLenker,
        } = this.props;
        const menyClass = BEMHelper(classname);
        this.hideBackgroundOverflow(menuIsOpen || varslerIsOpen);
        return (
            <>
                <section
                    className={menyClass
                        .element(
                            'startmeny',
                            menuIsOpen && !underMenuIsOpen ? 'aktive' : ''
                        )
                        .concat(' ')
                        .concat(menyClass.element('menuheight'))}
                >
                    <Sok
                        tabindex={this.hovedseksjonTabIndex()}
                        isOpen={menuIsOpen}
                    />
                    <InnloggetBruker tabIndex={this.hovedseksjonTabIndex()} />

                    <ForsideLenke
                        arbeidsflate={arbeidsflate}
                        erInnlogget={
                            this.props.innloggingsstatus.data.authenticated
                        }
                        tabindex={this.hovedseksjonTabIndex()}
                    />
                    {this.props.innloggingsstatus.data.authenticated &&
                        arbeidsflate === MenuValue.PRIVATPERSON && (
                            <div
                                className={menyClass.element('submeny', 'wrap')}
                            >
                                <Dittnavmeny
                                    minsideLenker={minsideLenker}
                                    tabIndex={this.hovedseksjonTabIndex()}
                                    className={menyClass.className}
                                    openMeny={this.setMenyliste}
                                    test={this.minsidelenkerRef}
                                />
                            </div>
                        )}
                    <MenyIngress
                        className={menyClass.element('meny', 'ingress')}
                        inputext={arbeidsflate}
                        tabindex={this.hovedseksjonTabIndex()}
                    />
                    <ul className={menyClass.element('meny', 'mainlist')}>
                        {menyLenker.children.map(
                            (menyElement: MenyNode, index: number) => {
                                return (
                                    <a
                                        className="lenke"
                                        ref={this.visningslenker[index]}
                                        key={index}
                                        href="https://nav.no"
                                        onClick={(event) =>
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
                            lang={lang}
                        />
                    )}
                </section>
                <Undermeny
                    className={menyClass.className}
                    undermenyIsOpen={menuIsOpen}
                    setFocusNode={this.focusNode}
                    tabindex={underMenuIsOpen && !menuIsOpen}
                    lenker={this.state.lenker}
                />
                <>
                    <VarselinnboksProvider>
                        <VarselvisningMobil
                            visvarsel={visvarsel}
                            visningmenyClassname={menyClass.className}
                            tabindex={
                                varslerIsOpen && !menuIsOpen && !underMenuIsOpen
                            }
                        />
                    </VarselinnboksProvider>
                </>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
    visvarsel: state.dropdownToggles.varsler,
    innloggingsstatus: state.innloggingsstatus,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    toggleVarsel: () => dispatch(toggleVarsler()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobilVisningsmeny);
