import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import './Toppmeny.less';
import { toppmenyLenker } from './Toppmeny-lenker';
import { MenuValue } from '../../../provider/Storage-provider';

const cls = BEMHelper('toppmeny');

interface Props {
    menyValg: MenuValue;
    callMenuStorage: (
        e: React.MouseEvent<HTMLAnchorElement>,
        valgVerdi: MenuValue,
        url: string
    ) => void;
}

const Toppmeny = (props: Props) => {
    return (
        <nav className="toppmeny">
            <ul className={cls.element('topp-liste-rad')} role="tablist">
                {toppmenyLenker.map(
                    (lenke: {
                        tittel: string;
                        url: string;
                        key: MenuValue;
                    }) => {
                        return (
                            <li
                                role="tab"
                                aria-selected={props.menyValg === lenke.tittel ? 'true' : 'false'}
                                className={cls.element('list-element')}
                                key={lenke.tittel}
                            >
                                <a
                                    className={cls.element('lenke')}
                                    href={lenke.url}
                                    onClick={event =>
                                        props.callMenuStorage(
                                            event,
                                            lenke.key,
                                            lenke.url
                                        )
                                    }
                                >
                                    <div
                                        className={cls.element('inner', props.menyValg === lenke.tittel ? 'active' : '')}
                                    >
                                        <EtikettLiten>
                                            {lenke.tittel}
                                        </EtikettLiten>
                                    </div>
                                </a>
                            </li>
                        );
                    }
                )}
            </ul>
        </nav>
    );
};

export default Toppmeny;
