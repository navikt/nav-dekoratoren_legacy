import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../../../utils/bem';
import { Data } from '../../../../reducer/menu-duck';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

interface Props {
    minsideMenyView: Data;
    className: string;
}

const DropdownHoyreSeksjon = (props: Props) => {
    const { className, minsideMenyView } = props;
    const cls = BEMHelper(className);
    if (minsideMenyView) {
        return (
            <div className={cls.element('minSideSeksjon')}>
                <ul>
                    <li className={cls.element('minside-list-item')}>
                        <Element>{minsideMenyView.displayName}</Element>
                    </li>
                    {minsideMenyView.children.map((input: any, index) => {
                        return (
                            <div key={index}>
                                {input.children &&
                                    input.children.map(
                                        (lenke: any, index: number) => {
                                            const item = listItem(
                                                lenke.displayName,
                                                cls,
                                                lenke.path
                                            );
                                            return (
                                                <div key={index}>{item}</div>
                                            );
                                        }
                                    )}
                            </div>
                        );
                    })}
                </ul>
            </div>
        );
    }
    return <div />;
};

const listItem = (name: string, cls: any, href: string) => {
    switch (name) {
        case 'å min side finner du:':
            return (
                <li className={cls.element('minside-list-item')}>
                    <Normaltekst>{name}</Normaltekst>
                </li>
            );
        case 'Gå til Min Side':
            return (
                <li className={cls.element('til-minside-lenke')}>
                    <Lenke className={cls.element('minside-lenke')} href={href}>
                        <Normaltekst>
                            <HoyreChevron />
                            {name}
                        </Normaltekst>
                    </Lenke>
                </li>
            );

        default:
            return (
                <li className={cls.element('minside-list-item')}>
                    <Lenke className={cls.element('minside-lenke')} href={href}>
                        <Normaltekst>{name}</Normaltekst>
                    </Lenke>
                </li>
            );
    }
};

export default DropdownHoyreSeksjon;
