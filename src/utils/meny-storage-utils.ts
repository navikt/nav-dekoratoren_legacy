import { MenyNode } from 'store/reducers/menu-duck';
import { Locale } from 'store/reducers/language-duck';

export enum MenuValue {
    PRIVATPERSON = 'privatperson',
    ARBEIDSGIVER = 'arbeidsgiver',
    SAMARBEIDSPARTNER = 'samarbeidspartner',
    IKKEBESTEMT = 'IKKEBESTEMT',
}

enum MenuName {
    Hovedmeny = 'Main menu',
    Minsidemeny = 'My page menu',
}

export const getHovedmenyNode = (
    menypunkter: MenyNode[],
    language: Locale,
    arbeidsflate: MenuValue
): MenyNode | undefined => {
    const languageNode = getLanguageNode(language, menypunkter);
    const isLanguageNorwegian = language === Locale.BOKMAL || language === Locale.NYNORSK;

    return languageNode
        ? isLanguageNorwegian
            ? findNode(languageNode, arbeidsflate)
            : findNode(languageNode, MenuName.Hovedmeny)
        : undefined;
};

export const getMinsidemenyNode = (menypunkter: MenyNode[], language: Locale): MenyNode | undefined => {
    const languageNode = getLanguageNode(language, menypunkter);
    return languageNode ? findNode(languageNode, MenuName.Minsidemeny) : undefined;
};

export const getLanguageNode = (lang: Locale, nodeMenu: MenyNode[]): MenyNode | undefined =>
    ({
        IKKEBESTEMT: undefined,
        nb: nodeMenu.find((n) => n.path === '/no'),
        nn: nodeMenu.find((n) => n.path === '/no'),
        en: nodeMenu.find((n) => n.path === '/en'),
        pl: nodeMenu.find((n) => n.path === '/en'),
        se: nodeMenu.find((n) => n.path === '/se'),
        uk: nodeMenu.find((n) => n.path === '/en'),
    }[lang]);

export const findNode = (node: MenyNode, displayName: string): MenyNode | undefined => {
    if (node.displayName.toLowerCase() === displayName.toLowerCase()) {
        return node;
    } else if (node.hasChildren) {
        let result = undefined;
        for (let i = 0; result == null && i < node.children.length; i++) {
            result = findNode(node.children[i], displayName);
        }
        return result;
    }
    return undefined;
};
