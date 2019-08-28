import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Environments from '../../../../utils/Environments';
import './MinsideLenke.less';

const { baseUrl } = Environments();
const dittNavURL = `${baseUrl}/person/dittnav/`;

const MinsideLenke = () => {
    return (
        <div className="minside-lenke">
            <Lenke href={dittNavURL}>Gå til min side</Lenke>
        </div>
    );
};

export default MinsideLenke;
