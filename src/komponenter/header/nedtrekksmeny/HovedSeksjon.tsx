import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';

interface Props {
    classname: string;
    menyLenker: {
        tittel: string;
        lenker: { tittel: string; url: string }[];
    }[];
}

const HovedSeksjon = (props: Props) => {
    const { classname, menyLenker } = props;
    const cls = BEMHelper(classname);

    const goto = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        window.location.href = url;
    };

    return (
        <div className={cls.element('hovedSeksjon')}>
            {menyLenker.map(
                (meny: {
                    tittel: string;
                    lenker: { tittel: string; url: string }[];
                }) => {
                    return (
                        <section
                            className={cls.element('seksjon')}
                            key={meny.tittel}
                        >
                            <div className={cls.element('seksjonOverskrift')}>
                                <Element>{meny.tittel}</Element>
                                <ul>
                                    {meny.lenker.map(
                                        (
                                            lenke: {
                                                tittel: string;
                                                url: string;
                                            },
                                            index: number
                                        ) => {
                                            return (
                                                <li key={index}>
                                                    <a
                                                        href={lenke.url}
                                                        onClick={event =>
                                                            goto(
                                                                event,
                                                                lenke.url
                                                            )
                                                        }
                                                    >
                                                        <Normaltekst>
                                                            {lenke.tittel}
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
                }
            )}
        </div>
    );
};

export default HovedSeksjon;
