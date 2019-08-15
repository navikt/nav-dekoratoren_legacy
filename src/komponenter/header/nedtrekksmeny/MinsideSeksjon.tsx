import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../../utils/bem';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

const MinsideSeksjon = ({ className }: { className: string }) => {
    const cls = BEMHelper(className);
    return (
        <div className={cls.element('minSideSeksjon')}>
            <ul>
                <li className={cls.element('minside-list-item')}>
                    <Element>Min side</Element>
                </li>

                <li className={cls.element('minside-list-item')}>
                    <Normaltekst>På Min side finner du</Normaltekst>
                </li>
                <li className={cls.element('minside-list-item')}>
                    <Lenke
                        className={cls.element('minside-lenke')}
                        href="javascript:void(0)"
                    >
                        <Normaltekst>innboksen din</Normaltekst>
                    </Lenke>
                </li>
                <li className={cls.element('minside-list-item')}>
                    <Lenke
                        className={cls.element('minside-lenke')}
                        href="javascript:void(0)"
                    >
                        <Normaltekst>status i saken din</Normaltekst>
                    </Lenke>
                </li>
                <li className={cls.element('minside-list-item')}>
                    <Lenke
                        className={cls.element('minside-lenke')}
                        href="javascript:void(0)"
                    >
                        <Normaltekst>utbetalingene dine</Normaltekst>
                    </Lenke>
                </li>
                <li className={cls.element('minside-list-item')}>
                    <Lenke
                        className={cls.element('minside-lenke')}
                        href="javascript:void(0)"
                    >
                        <Normaltekst>
                            kontonummeret og annen informasjon om deg
                        </Normaltekst>
                    </Lenke>
                </li>
                <li className={cls.element('minside-list-item')}>
                    <Lenke
                        className={cls.element('minside-lenke')}
                        href="javascript:void(0)"
                    >
                        <Normaltekst>og mye mer</Normaltekst>
                    </Lenke>
                </li>
                <li className={cls.element('til-minside-lenke')}>
                    <Lenke
                        className={cls.element('minside-lenke')}
                        href="javascript:void(0)"
                    >
                        <Normaltekst>
                            <HoyreChevron /> Gå til Min Side
                        </Normaltekst>
                    </Lenke>
                </li>
            </ul>
        </div>
    );
};

export default MinsideSeksjon;
