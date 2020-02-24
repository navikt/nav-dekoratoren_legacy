import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import Lukkundermeny from '../../ekspanderende-menyer/meny-uinnlogget-mobil/meny-dropdown/mobil-innhold/Lukkundermeny';
import VarselVisning from './Varselvisning';
import TopSeksjon from '../../ekspanderende-menyer/meny-uinnlogget-mobil/meny-dropdown/mobil-innhold/top-seksjon/Topseksjon';
import './Varselvisning.less';

interface OwnProps {
    visvarsel: boolean;
    visningmenyClassname: string;
    togglevarselmeny: () => void;
    lukkvarselmeny: () => void;
    lukkmenyene: () => void;
    tabindex: boolean;
    clicked: boolean;
    menuIsOpen: boolean;
}

class VarselvisningMobil extends React.Component<OwnProps> {
    lukkvarselmenyOgfjernTabindex = () => {
        this.props.togglevarselmeny();
        this.props.lukkvarselmeny();
    };

    lukkvarselOgMenyer = () => {
        this.lukkvarselmenyOgfjernTabindex();
        this.props.lukkmenyene();
    };

    componentDidUpdate(prevProps: Readonly<OwnProps>): void {
        if (!this.props.menuIsOpen && this.props.visvarsel) {
            this.lukkvarselmenyOgfjernTabindex();
        }
    }

    render() {
        const cls = BEMHelper(this.props.visningmenyClassname);

        return (
            <section
                className={cls.element(
                    'varsel-innhold',
                    this.props.visvarsel ? 'active' : ''
                )}
            >
                <TopSeksjon
                    lukkmeny={this.lukkvarselOgMenyer}
                    tabindex={this.props.tabindex}
                />
                <Lukkundermeny
                    lukkundermeny={this.lukkvarselmenyOgfjernTabindex}
                    className={cls.className}
                    tabindex={this.props.tabindex}
                />
                <VarselVisning
                    tabIndex={this.props.tabindex}
                    togglevarselmeny={this.props.togglevarselmeny}
                />
            </section>
        );
    }
}

export default VarselvisningMobil;
