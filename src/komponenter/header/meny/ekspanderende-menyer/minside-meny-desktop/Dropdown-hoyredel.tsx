import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import BEMHelper from '../../../../../utils/bem';
import Tekst from '../../../../../tekster/finn-tekst';
import { MenySeksjon } from '../../../../../reducer/menu-duck';
import Environment from '../../../../../utils/Environment';

interface Props {
    minsideMeny: MenySeksjon;
    classname: string;
    tabindex: boolean;
}

const DropdownHoyredel = (props: Props) => {
    const { classname, minsideMeny, tabindex } = props;
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('minSideSeksjon')}>
            <Element>
                <Tekst id="min-side" />
            </Element>
            <MinsideLenker minsideMeny={minsideMeny} tabindex={tabindex} />
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
                    (lenke: MenySeksjon, index: number) => (
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
        <Lenke tabIndex={tabindex ? 0 : -1} href={Environment.DITT_NAV_URL}>
            <>
                <HoyreChevron />
                <Tekst id="ga-til-min-side" />
            </>
        </Lenke>
    </div>
);

export default DropdownHoyredel;
