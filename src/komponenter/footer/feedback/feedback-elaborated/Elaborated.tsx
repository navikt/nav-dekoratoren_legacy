import React, { Fragment } from 'react';
import { CheckboxGruppe, Checkbox } from 'nav-frontend-skjema';
import { Textarea } from 'nav-frontend-skjema';
import './Elaborated.less'

const Elaborated = () => {

    const textareaDidChange = () => {
        console.log('Endret');
        
    }

    return (
        <div className="elaborated-wrapper">
            <CheckboxGruppe legend='Hva gikk galt?'>
                <Checkbox label={'Jeg ble forvirret'} name='feil'/>
                <Checkbox label={'For mye tekst'} name='feil'/>
                <Checkbox label={'Annet. Gjerne spesifiser under'} name='feil' />
            </CheckboxGruppe>

            <Textarea 
                label='Din tilbakemelding'
                inputMode='text'    
                value=''
                onChange={textareaDidChange}
            >
            </Textarea>
        </div>
    );
};

export default Elaborated;