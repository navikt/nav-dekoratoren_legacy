import React from 'react';
import classnames from 'classnames';
import TypografiBase from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import BEMHelper from 'utils/bem';

interface Props<T> {
    className?: string;
    tittel?: {
        typografitype?: string;
        tekst: JSX.Element | string;
    };
    data?: T[];
    typografiTypeliste?: string;
    listElement: (lenke: T) => JSX.Element;
    linkLoader?: JSX.Element;
}

function LenkeListe<T>({
    className,
    tittel,
    listElement,
    data,
    typografiTypeliste = 'normaltekst',
    linkLoader,
}: Props<T>) {
    const cls = BEMHelper('liste');
    const ariaLabelledById = tittel ? guid() : undefined;
    return (
        <div className={classnames(cls.className, className)}>
            {tittel && (
                <TypografiBase
                    id={ariaLabelledById}
                    className={cls.element('overskrift')}
                    type={tittel.typografitype || 'normaltekst'}
                >
                    {tittel.tekst}
                </TypografiBase>
            )}
            <ul
                className={cls.element('liste')}
                aria-labelledby={ariaLabelledById}
            >
                {data === undefined
                    ? linkLoader
                    : data.map((d) => (
                          <li
                              className={cls.element('liste-element')}
                              key={guid()}
                          >
                              <TypografiBase type={typografiTypeliste}>
                                  {listElement(d)}
                              </TypografiBase>
                          </li>
                      ))}
            </ul>
        </div>
    );
}

export default LenkeListe;
