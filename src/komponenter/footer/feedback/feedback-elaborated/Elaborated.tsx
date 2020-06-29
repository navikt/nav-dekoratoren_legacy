import React, { Fragment } from 'react';
import { CheckboxGruppe, Checkbox } from 'nav-frontend-skjema';
import { Textarea } from 'nav-frontend-skjema';
import './Elaborated.less'

// TODO https://design.nav.no/components/textarea Manuell håndtering av state. Hooks.

const Elaborated = () => {

    const textareaDidChange = () => {
        console.log('Endret');
        
    }

    return (
        <div className="elaborated-wrapper">
            <CheckboxGruppe legend='Hva gikk galt?'>
                <Checkbox label={'Informasjonen var forvirrende'} name='feil'/>
                <Checkbox label={'Det var for mye innformasjon'} name='feil'/>
                <Checkbox label={'Informasjonen var tvetydig'} name='feil'/>
                <Checkbox label={'Annet - Gjerne spesifiser under'} name='feil' />
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