import React, { useEffect, useState } from 'react';
import Tekst from 'tekster/finn-tekst';
import { mobilHovedmenyKnappId } from '../header-regular/mobil/hovedmeny/HovedmenyMobil';
import { desktopHovedmenyKnappId } from '../header-regular/desktop/hovedmeny/HovedmenyDesktop';
import { useDispatch } from 'react-redux';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import './Skiplinks.less';

type SkipLink = {
    href?: string;
    tekstId: string;
    onClick?: () => void;
};

const SkipLinkElement = ({
    link,
    className,
}: {
    link: SkipLink;
    className?: string;
}) => (
    <li>
        <a
            href={`#${link.href || ''}`}
            className={`visuallyhidden focusable ${className || ''}`}
            onClick={link.onClick}
        >
            <Tekst id={link.tekstId} />
        </a>
    </li>
);

const Skiplinks = () => {
    const dispatch = useDispatch();
    const [hasMainContent, setHasMainContent] = useState(false);

    const mobilLinks: SkipLink[] = [
        {
            href: mobilHovedmenyKnappId,
            tekstId: 'skiplinks-ga-til-hovedmeny',
        },
        {
            tekstId: 'skiplinks-ga-til-sok',
        },
    ];

    const desktopLinks: SkipLink[] = [
        {
            href: desktopHovedmenyKnappId,
            tekstId: 'skiplinks-ga-til-hovedmeny',
        },
        {
            tekstId: 'skiplinks-ga-til-sok',
            onClick: () => dispatch(toggleSok()),
        },
    ];

    useEffect(() => {
        const mainContentElement = document.getElementById('maincontent');
        setHasMainContent(!!mainContentElement);
    }, []);

    return (
        <nav
            id="site-skiplinks"
            className="site-skiplinks"
            aria-label="Hopp til innhold"
        >
            <ul>
                {mobilLinks.map((link, index) => (
                    <SkipLinkElement
                        link={link}
                        className={'site-skiplinks__mobil'}
                        key={index}
                    />
                ))}
                {desktopLinks.map((link, index) => (
                    <SkipLinkElement
                        link={link}
                        className={'site-skiplinks__desktop'}
                        key={index}
                    />
                ))}
                {hasMainContent && (
                    <SkipLinkElement
                        link={{
                            href: '#maincontent',
                            tekstId: 'skiplinks-ga-til-hovedinnhold',
                        }}
                    />
                )}
            </ul>
        </nav>
    );
};

export default Skiplinks;
