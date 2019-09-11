import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import BEMHelper from '../../../../utils/bem';
import { Data } from '../../../../reducer/menu-duck';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import MediaQuery from 'react-responsive';

interface Props {
    minsideMenyView: Data;
    classname: string;
    tabindex: boolean;
}

const DropdownHoyreSeksjon = (props: Props) => {
    const { classname, minsideMenyView, tabindex } = props;
    const cls = BEMHelper(classname);
    if (minsideMenyView) {
        return (
            <div className={cls.element('minSideSeksjon')}>
                <MediaQuery minWidth={1024}>
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
                                                    lenke.path,
                                                    tabindex
                                                );
                                                return (
                                                    <div key={index}>
                                                        {item}
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            );
                        })}
                    </ul>
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                    <ul>
                        <Ekspanderbartpanel
                            tittel={minsideMenyView.displayName}
                            tittelProps="normaltekst"
                            border
                        >
                            {minsideMenyView.children.map(
                                (input: any, index) => {
                                    return (
                                        <div key={index}>
                                            {input.children &&
                                                input.children.map(
                                                    (
                                                        lenke: any,
                                                        index: number
                                                    ) => {
                                                        const item = listItem(
                                                            lenke.displayName,
                                                            cls,
                                                            lenke.path,
                                                            tabindex
                                                        );
                                                        return (
                                                            <div key={index}>
                                                                {item}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    );
                                }
                            )}
                        </Ekspanderbartpanel>
                    </ul>
                </MediaQuery>
            </div>
        );
    }
    return <div />;
};

/*
                    <li className={cls.element('minside-list-item')}>
                        <Element>{minsideMenyView.displayName}</Element>
                    </li>
 */

const listItem = (name: string, cls: any, href: string, tabindex: boolean) => {
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
                    <Lenke
                        tabIndex={tabindex ? 0 : -1}
                        className={cls.element('minside-lenke')}
                        href={href}
                    >
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
                    <Lenke
                        tabIndex={tabindex ? 0 : -1}
                        className={cls.element('minside-lenke')}
                        href={href}
                    >
                        <Normaltekst>{name}</Normaltekst>
                    </Lenke>
                </li>
            );
    }
};

export default DropdownHoyreSeksjon;
