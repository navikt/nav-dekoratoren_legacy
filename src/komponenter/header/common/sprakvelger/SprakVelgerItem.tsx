import React from 'react';
import Cicle from 'ikoner/circle.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { farger, LocaleOption } from './SprakVelger';
import { BEMWrapper } from 'utils/bem';
import { Bilde } from '../../../common/bilde/Bilde';

interface Props {
    index: number;
    item: LocaleOption;
    cls: BEMWrapper;
    highlightedIndex: number;
    selectedItem: LocaleOption | null;
    itemProps: any;
}

const SprakVelgerItem = (props: Props) => {
    const { selectedItem, highlightedIndex, index } = props;
    const { item, itemProps, cls } = props;

    const style =
        highlightedIndex === index
            ? {
                  backgroundColor: farger.navBla,
                  color: 'white',
              }
            : {
                  backgroundColor: 'white',
                  color: 'black',
              };
    return (
        <li {...itemProps} style={style} className="menuList">
            {selectedItem?.locale === item.locale ? (
                <div className={cls.element('option')}>
                    <Bilde asset={Cicle} className={cls.element('sirkel')} />
                    <Normaltekst lang={item.locale}>{item.label} </Normaltekst>
                </div>
            ) : (
                <Normaltekst className={cls.element('option')}>
                    <span lang={item.locale} className="not-selected">{item.label}</span>
                </Normaltekst>
            )}
        </li>
    );
};

export default SprakVelgerItem;
