import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Close from '../../../../../ikoner/varsler/Close';
import BEMHelper from '../../../../../utils/bem';
import Nedteller, { TypografiTypes } from '../Nedteller';
import CollapseUp from '../../../../../ikoner/varsler/CollapseUp';
import { Normaltekst } from 'nav-frontend-typografi';
import './liteEkspanderbartvindu.less';

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    setMinimized: Dispatch<SetStateAction<boolean>>;
    minimized: boolean;
    typoGrafi: TypografiTypes;
    tid: string;
    visFullTekst: boolean;
}

const LiteEkspanderbartvindu: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('liteExpanderbartvindu');
    const { setMinimized, setModalOpen, typoGrafi, tid, visFullTekst } = props;
    const tekst = visFullTekst ? 'Du blir automatisk logget ut om ' : '';
    return (
        <div className={cls.className}>
            <div className={cls.element('wrapper')}>
                <Nedteller typoGrafi={typoGrafi} tekst={tekst.concat(tid)} />
                <div className={cls.element('expanderbart-nav')}>
                    <>
                        <div className={cls.element('btn-container')}>
                            <button
                                onClick={() => {
                                    document.body.style.overflow = 'hidden';
                                    setMinimized(false);
                                }}
                            >
                                <span className={cls.element('btn-content')}>
                                    <Normaltekst>Åpne</Normaltekst>
                                    <CollapseUp width="1.5rem" height="1.5rem" />
                                </span>
                            </button>
                        </div>
                    </>
                    <div className={cls.element('btn-container')}>
                        <button
                            onClick={() => {
                                setMinimized(false);
                                setModalOpen(false);
                            }}
                        >
                            <span className={cls.element('btn-content')}>
                                <Normaltekst>Lukk</Normaltekst>
                                <Close width="1.5rem" height="1.5rem" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LiteEkspanderbartvindu;
