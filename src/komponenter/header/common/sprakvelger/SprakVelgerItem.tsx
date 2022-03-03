import React from 'react';
import Cicle from 'ikoner/circle.svg';
import { farger, LocaleOption } from './SprakVelger';
import { BEMWrapper } from 'utils/bem';
import { Bilde } from '../../../common/bilde/Bilde';
import { BodyShort } from '@navikt/ds-react';

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
                    <BodyShort size="small" lang={item.locale}>
                        {item.label}{' '}
                    </BodyShort>
                </div>
            ) : (
                <BodyShort size="small" className={cls.element('option')}>
                    <span lang={item.locale} className="not-selected">
                        {item.label}
                    </span>
                </BodyShort>
            )}
        </li>
    );
};

export default SprakVelgerItem;
