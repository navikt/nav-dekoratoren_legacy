import React, { useEffect } from 'react';
import './Varselvisning.less';
import BEMHelper from '../../../../../utils/bem';
import Lukkundermeny from '../../ekspanderbar-meny/mobil-visningsmeny/mobil-innhold/Lukkundermeny';
import VarselVisning from './Varselvisning';
import TopSeksjon from '../../ekspanderbar-meny/mobil-visningsmeny/mobil-innhold/top-seksjon/Topseksjon';

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
            <>
                <section
                    id="varsler-display"
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
                        className="vis-alle-lenke"
                        tabIndex={this.props.tabindex}
                        togglevarselmeny={this.props.togglevarselmeny}
                    />
                </section>
            </>
        );
    }
}

export default VarselvisningMobil;
