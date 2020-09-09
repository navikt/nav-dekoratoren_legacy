import React from 'react';
import Cicle from 'ikoner/circle.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { finnTekst } from 'tekster/finn-tekst';
import { farger, LocaleOption } from './SprakVelger';
import { useSelector } from 'react-redux';
import { BEMWrapper } from 'utils/bem';
import { AppState } from 'store/reducers';
import { Bilde } from '../../../common/bilde/Bilde';

interface Props {
    index: number;
    item: LocaleOption;
    cls: BEMWrapper;
    highlightedIndex: number;
    selectedItem: LocaleOption | null;
    itemProps: any;
}

const Item = (props: Props) => {
    const { language } = useSelector((state: AppState) => state.language);
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
                    <Normaltekst>
                        {item.label}{' '}
                        <span className="sr-only">
                            {finnTekst('sprak-valgt', language)}
                        </span>
                    </Normaltekst>
                </div>
            ) : (
                <Normaltekst className={cls.element('option')}>
                    <span className="not-selected">{props.item.label}</span>
                </Normaltekst>
            )}
        </li>
    );
};

export default Item;
