import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../../utils/bem';

const MinsideSeksjon = ({ className }: { className: string }) => {
    const cls = BEMHelper(className);
    return (
        <div className={cls.element('minSideSeksjon')}>
            <Element>Min side</Element>
            <Normaltekst>På Min side finner du</Normaltekst>
            <ul>
                <li>
                    <Lenke href="javascript:void(0)">
                        <Normaltekst>innboksen din</Normaltekst>
                    </Lenke>
                </li>
                <li>
                    <Lenke href="javascript:void(0)">
                        <Normaltekst>status i saken din</Normaltekst>
                    </Lenke>
                </li>
                <li>
                    <Lenke href="javascript:void(0)">
                        <Normaltekst>utbetalingene dine</Normaltekst>
                    </Lenke>
                </li>
                <li>
                    <Lenke href="javascript:void(0)">
                        <Normaltekst>
                            kontonummeret og annen informasjon om deg
                        </Normaltekst>
                    </Lenke>
                </li>
                <li>
                    <Lenke href="javascript:void(0)">
                        <Normaltekst>og mye mer</Normaltekst>
                    </Lenke>
                </li>
            </ul>
            <div>
                <Lenke href="javascript:void(0)">
                    <Normaltekst className={'test'}>
                        > Gå til Min Side
                    </Normaltekst>
                </Lenke>
            </div>
        </div>
    );
};

export default MinsideSeksjon;
