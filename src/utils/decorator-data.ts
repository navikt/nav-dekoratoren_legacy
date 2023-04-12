import { Environment } from 'store/reducers/environment-duck';
import { MenyNode } from 'store/reducers/menu-duck';

interface DecoratorData {
    env: Environment;
    menu: MenyNode[];
}

export const getDecoratorData = (): DecoratorData | undefined => {
    try {
        const string = document.getElementById('__DECORATOR_DATA__')?.innerHTML;
        if (string) {
            return JSON.parse(string);
        } else {
            return undefined;
        }
    } catch (e) {
        console.error('error when parsing decorator data json', e);
        return undefined;
    }
};
