import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import BEMHelper from '../../../../utils/bem';
import { MenyLenke, MenySeksjon } from '../../../../reducer/menu-duck';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import MediaQuery from 'react-responsive';
import { dittNavURL } from '../minside-lenke/MinsideLenke';
import Tekst from '../../../../tekster/finn-tekst';

interface Props {
    minsideMeny: MenySeksjon;
    classname: string;
    tabindex: boolean;
}

const DropdownHoyreSeksjon = (props: Props) => {
    const { classname, minsideMeny, tabindex } = props;
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('minSideSeksjon')}>
            <MediaQuery maxWidth={1023}>
                <Ekspanderbartpanel
                    tittel={minsideMeny.displayName}
                    tittelProps="normaltekst"
                    border
                >
                    <MinsideLenker
                        minsideMeny={minsideMeny}
                        tabindex={tabindex}
                    />
                </Ekspanderbartpanel>
            </MediaQuery>

            <MediaQuery minWidth={1024}>
                <>
                    <Element>
                        <Tekst id="min-side" />
                    </Element>
                    <MinsideLenker
                        minsideMeny={minsideMeny}
                        tabindex={tabindex}
                    />
                </>
            </MediaQuery>
        </div>
    );
};

interface MinsideLenkerProps {
    minsideMeny: MenySeksjon;
    tabindex: boolean;
}

const MinsideLenker = ({ minsideMeny, tabindex }: MinsideLenkerProps) => (
    <>
        <Normaltekst>
            <Tekst id="pa-min-side-finner-du" />
        </Normaltekst>
        <ul>
            {minsideMeny.children[0].children &&
                minsideMeny.children[0].children.map(
                    (lenke: MenyLenke, index: number) => (
                        <MinsideListItem
                            lenketekst={lenke.displayName}
                            href={lenke.path}
                            tabindex={tabindex}
                            key={index}
                        />
                    )
                )}
        </ul>
        <MinSideLenke tabindex={tabindex} />
    </>
);

interface MinsideListItemProps {
    lenketekst: string;
    href: string;
    tabindex: boolean;
}

const MinsideListItem = ({
    lenketekst,
    href,
    tabindex,
}: MinsideListItemProps) => (
    <li className="minside-list-item">
        <Lenke tabIndex={tabindex ? 0 : -1} href={href}>
            {lenketekst}
        </Lenke>
    </li>
);

interface MinSideLenkeProps {
    tabindex: boolean;
}

const MinSideLenke = ({ tabindex }: MinSideLenkeProps) => (
    <div className="minside-dittnav-lenke">
        <Lenke tabIndex={tabindex ? 0 : -1} href={dittNavURL}>
            <>
                <HoyreChevron />
                <Tekst id="ga-til-min-side" />
            </>
        </Lenke>
    </div>
);

export default DropdownHoyreSeksjon;
