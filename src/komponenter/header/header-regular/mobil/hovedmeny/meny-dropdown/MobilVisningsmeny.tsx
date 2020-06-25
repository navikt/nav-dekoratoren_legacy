import React from 'react';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import BEMHelper from 'utils/bem';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { Language } from 'store/reducers/language-duck';
import MenyIngress from './mobil-innhold/MenyIngress';
import Undermeny from './mobil-innhold/Undermeny';
import Listelement from './mobil-innhold/Listelement';
import MobilarbeidsflateValg from '../../arbeidsflatemeny/MobilarbeidsflateValg';
import { AppState } from 'store/reducers';
import { connect } from 'react-redux';
import InnloggetBruker from './mobil-innhold/innloggetbruker/InnloggetBruker';
import ForsideLenke from './mobil-innhold/ForsideLenke';
import Dittnavmeny from './mobil-innhold/dittnavmeny/Dittnavmeny';
import { InnloggingsstatusState } from 'store/reducers/innloggingsstatus-duck';
import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import './MobilVisningsmeny.less';

export const mobilSokInputId = `mobil-sok-input`;

interface StateProps {
    arbeidsflate: MenuValue;
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

type Props = VisningsmenyProps & StateProps;

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
            arbeidsflate,
            lang,
            underMenuIsOpen,
            minsideLenker,
        } = this.props;
        const menyClass = BEMHelper(classname);
        return (
            <div className={menyClass.className}>
                <section
                    className={menyClass.element(
                        'startmeny',
                        menuIsOpen && !underMenuIsOpen ? 'active' : ''
                    )}
                >
                    <Sok
                        isOpen={menuIsOpen}
                        dropdownTransitionMs={400}
                        id={mobilSokInputId}
                    />
                    <InnloggetBruker />

                    <ForsideLenke
                        arbeidsflate={arbeidsflate}
                        erInnlogget={
                            this.props.innloggingsstatus.data.authenticated
                        }
                    />
                    {this.props.innloggingsstatus.data.authenticated &&
                        arbeidsflate === MenuValue.PRIVATPERSON && (
                            <div
                                className={menyClass.element('submeny', 'wrap')}
                            >
                                <Dittnavmeny
                                    minsideLenker={minsideLenker}
                                    className={menyClass.className}
                                    openMeny={this.setMenyliste}
                                    test={this.minsidelenkerRef}
                                />
                            </div>
                        )}
                    <MenyIngress
                        className={menyClass.element('meny', 'ingress')}
                        inputext={arbeidsflate}
                    />
                    <ul className={menyClass.element('meny', 'mainlist')}>
                        {menyLenker.children.map(
                            (menyElement: MenyNode, index: number) => {
                                return (
                                    <Listelement
                                        key={index}
                                        className={menyClass.className}
                                        classElement="text-element"
                                    >
                                        <a
                                            className="lenke"
                                            ref={this.visningslenker[index]}
                                            href="https://nav.no"
                                            onClick={(event) =>
                                                this.setMenyliste(
                                                    event,
                                                    menyElement,
                                                    this.visningslenker[index]
                                                        .current
                                                )
                                            }
                                        >
                                            {menyElement.displayName}
                                            <HoyreChevron />
                                        </a>
                                    </Listelement>
                                );
                            }
                        )}
                    </ul>
                    {lang === Language.NORSK && (
                        <MobilarbeidsflateValg lang={lang} />
                    )}
                </section>
                <Undermeny
                    className={menyClass.className}
                    undermenyIsOpen={underMenuIsOpen}
                    setFocusNode={this.focusNode}
                    lenker={this.state.lenker}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
    innloggingsstatus: state.innloggingsstatus,
});

export default connect(mapStateToProps)(MobilVisningsmeny);
