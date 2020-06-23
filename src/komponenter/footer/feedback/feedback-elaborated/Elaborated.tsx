import React, { Fragment } from 'react';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';
import { Textarea } from 'nav-frontend-skjema';

const Elaborated = () => {

    const textareaDidChange = () => {
        console.log('Endret');
        
    }

    return (
        <Fragment>
            <RadioGruppe legend='Hva gikk galt?'>
                <Radio label={'Jeg ble forvirret'} name='feil'/>
                <Radio label={'For mye tekst'} name='feil'/>
                <Radio label={'Annet. Gjerne spesifiser under'} name='feil' />
            </RadioGruppe>

            <Textarea 
                label='Din tilbakemelding'
                inputMode='text'    
                value=''
                onChange={textareaDidChange}
            >
            </Textarea>
        </Fragment>
    );
};

export default Elaborated;