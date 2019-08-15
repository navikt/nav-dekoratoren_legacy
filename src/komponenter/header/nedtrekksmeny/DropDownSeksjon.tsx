import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';

interface Props {
    classname: string;
    menyLenker: {
        children: {}[];
        displayName: string;
        hasChildren: boolean;
        path: string;
    };
    status: string;
}

const DropDownSeksjon = (props: Props) => {
    const { classname, menyLenker, status } = props;
    const cls = BEMHelper(classname);

    const goto = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        window.location.href = url;
    };

    const presentOptions = (
        meny: {
            children: {}[];
            displayName: string;
            hasChildren: boolean;
            path: string;
        },
        status: string
    ) => {
        if (status.toUpperCase() == 'OK') {
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

export default DropDownSeksjon;
