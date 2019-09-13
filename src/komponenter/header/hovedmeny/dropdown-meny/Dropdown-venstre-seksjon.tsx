import React from 'react';
import { Element } from 'nav-frontend-typografi';
import MediaQuery from 'react-responsive';
import BEMHelper from '../../../../utils/bem';
import { Data } from '../../../../reducer/menu-duck';
import { DropdownVenstreLenke } from './Dropdown-venstre-lenke';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    classname: string;
    menyLenker: Data;
    tabindex: boolean;
}

const DropdownVenstreSeksjon = (props: Props) => {
    const { classname, menyLenker, tabindex } = props;
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('hovedSeksjon')}>
            {menyLenker.children.map((menygruppe: any) => {
                return (
                    <section
                        className={cls.element('seksjon')}
                        key={menygruppe.displayName}
                    >
                        <div className={cls.element('seksjonOverskrift')}>
                            <MediaQuery minWidth={1024}>
                                <Element>{menygruppe.displayName}</Element>
                                <ul>
                                    {menygruppe.children.map(
                                        (lenke: any, index: number) => {
                                            return (
                                                <DropdownVenstreLenke
                                                    lenke={lenke}
                                                    index={index}
                                                    tabindex={tabindex}
                                                />
                                            );
                                        }
                                    )}
                                </ul>
                            </MediaQuery>
                            <MediaQuery maxWidth={1023}>
                                <Ekspanderbartpanel
                                    tittel={menygruppe.displayName}
                                    tittelProps="normaltekst"
                                    border
                                >
                                    <ul>
                                        {menygruppe.children.map(
                                            (lenke: any, index: number) => {
                                                return (
                                                    <DropdownVenstreLenke
                                                        lenke={lenke}
                                                        index={index}
                                                        tabindex={tabindex}
                                                    />
                                                );
                                            }
                                        )}
                                    </ul>
                                </Ekspanderbartpanel>
                            </MediaQuery>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default DropdownVenstreSeksjon;
