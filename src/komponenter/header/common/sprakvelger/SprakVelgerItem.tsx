import React from 'react';
import Cicle from 'ikoner/circle.svg';
import { farger, LocaleOption } from './SprakVelger';
import { Bilde } from '../../../common/bilde/Bilde';
import { BodyShort } from '@navikt/ds-react';
import style from 'komponenter/header/common/sprakvelger/SprakVelger.module.scss';

interface Props {
    index: number;
    item: LocaleOption;
    highlightedIndex: number;
    selectedItem: LocaleOption | null;
    itemProps: any;
}

const SprakVelgerItem = (props: Props) => {
    const { selectedItem, highlightedIndex, index } = props;
    const { item, itemProps } = props;

    const inlineStyle =
        highlightedIndex === index
            ? {
                  backgroundColor: farger.navBla,
                  color: 'white',
              }
            : {
                  backgroundColor: 'white',
                  color: 'black',
              };

    delete itemProps['aria-selected'];
    delete itemProps.role;

    const isItemSelected = selectedItem?.locale === item.locale;

    return (
        <li style={inlineStyle} className={style.menuList}>
            <button {...itemProps} className={style.option}>
                {isItemSelected && <Bilde asset={Cicle} className={style.sirkel} />}
                <BodyShort as="span" size="small" lang={item.locale} className={!isItemSelected && style.notSelected}>
                    {item.label}
                </BodyShort>
            </button>
        </li>
    );
};

export default SprakVelgerItem;
