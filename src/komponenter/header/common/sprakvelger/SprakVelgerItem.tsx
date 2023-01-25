import React from 'react';
import Cicle from 'ikoner/circle.svg';
import { LocaleOption } from './SprakVelger';
import { Bilde } from '../../../common/bilde/Bilde';
import { BodyShort } from '@navikt/ds-react';
import style from 'komponenter/header/common/sprakvelger/SprakVelger.module.scss';

interface Props {
    index: number;
    item: LocaleOption;
    selectedItem: LocaleOption | null;
    onSelectedItemChange: any;
}

const SprakVelgerItem = (props: Props) => {
    const { selectedItem, index } = props;
    const { item } = props;

    const isItemSelected = selectedItem?.locale === item.locale;

    return (
        <li className={style.menuListItem}>
            <button className={style.option} data-index={index}>
                {isItemSelected && <Bilde asset={Cicle} className={style.sirkel} />}
                <BodyShort as="span" size="small" lang={item.locale} className={!isItemSelected && style.notSelected}>
                    {item.label}
                </BodyShort>
            </button>
        </li>
    );
};

export default SprakVelgerItem;
