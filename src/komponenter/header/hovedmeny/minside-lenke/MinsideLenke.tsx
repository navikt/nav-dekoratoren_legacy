import React from 'react';
import Lenke from 'nav-frontend-lenker';
import './MinsideLenke.less';
import Environments from '../../../../utils/Environments';

const { baseUrl } = Environments();
const dittNavURL = `${baseUrl}/person/dittnav/`;

const MinsideLenke = () => {
    return (
        <div className="minside-lenke">
            <Lenke href={dittNavURL}>
                Min side
            </Lenke>
        </div>
    );
};

export default MinsideLenke;
