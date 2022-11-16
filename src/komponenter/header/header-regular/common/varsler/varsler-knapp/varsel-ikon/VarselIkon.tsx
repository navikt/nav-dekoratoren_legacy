import React from 'react';
import { Bell } from '@navikt/ds-icons';
import style from './VarselIkon.module.scss';

type Props = {
    antallUleste?: number;
};

export const VarselIkon = ({ antallUleste = 0 }: Props) => {
    return (
        <>
            <Bell aria-hidden className={style.varselBellIkon} />
            <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={style.varselCloseIkon}
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.7929 15.4142L0.792937 1.41421L2.20715 6.18174e-08L16.2071 14L14.7929 15.4142Z"
                    fill="#0067C5"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.792908 14L14.7929 0L16.2071 1.41421L2.20712 15.4142L0.792908 14Z"
                    fill="#0067C5"
                />
            </svg>

            <div className={`${style.ulestSirkel} ${antallUleste === 0 ? style.hide : ''}`} />
        </>
    );
};
