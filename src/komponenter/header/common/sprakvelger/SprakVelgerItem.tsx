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
    return (
        <li {...itemProps} style={inlineStyle} className={style.menuList}>
            {selectedItem?.locale === item.locale ? (
                <div className={style.option}>
                    <Bilde asset={Cicle} className={style.sirkel} />
                    <BodyShort size="small" lang={item.locale}>
                        {item.label}
                    </BodyShort>
                </div>
            ) : (
                <BodyShort size="small" className={style.option}>
                    <span lang={item.locale} className="not-selected">
                        {item.label}
                    </span>
                </BodyShort>
            )}
        </li>
    );
};

export default SprakVelgerItem;
