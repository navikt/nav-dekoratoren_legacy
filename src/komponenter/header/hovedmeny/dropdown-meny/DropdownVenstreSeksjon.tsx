import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../../utils/bem';
import { Data } from '../../../../reducer/menu-duck';
import { Status } from '../../../../api/api';

interface Props {
    classname: string;
    menyLenker: Data;
    status: Status;
    tabindex: boolean;
}

const DropdownVenstreSeksjon = (props: Props) => {
    const { classname, menyLenker, status, tabindex } = props;
    const cls = BEMHelper(classname);

    const goto = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        window.location.href = url;
    };

    const presentOptions = (meny: Data, currentStatus: Status) => {
        if (currentStatus === Status.OK) {
            return meny.children.map((meny: any) => {
                return (
                    <section
                        className={cls.element('seksjon')}
                        key={meny.displayName}
                    >
                        <div className={cls.element('seksjonOverskrift')}>
                            <Element>{meny.displayName}</Element>
                            <ul>
                                {meny.children.map(
                                    (lenke: any, index: number) => {
                                        return (
                                            <li key={index}>
                                                <a
                                                    tabIndex={tabindex ? 0 : -1}
                                                    href={lenke.path}
                                                    onClick={event =>
                                                        goto(event, lenke.path)
                                                    }
                                                >
                                                    <Normaltekst>
                                                        {lenke.displayName}
                                                    </Normaltekst>
                                                </a>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    </section>
                );
            });
        }
        return <div />;
    };

    return (
        <div className={cls.element('hovedSeksjon')}>
            {presentOptions(menyLenker, status)}
        </div>
    );
};

export default DropdownVenstreSeksjon;
