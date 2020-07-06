import { ActionType } from '../../store/actions';
import { Status } from '../../api/api';
import { kbMasterNode } from '../keyboard-navigation/useKbNavMain';

export const innloggetAction = {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
    status: Status.OK,
    data: {
        authenticated: true,
        name: 'Ola Nordmann',
        securityLevel: '4',
    },
};

export const uInnloggetAction = {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
    status: Status.OK,
    data: {
        authenticated: false,
    },
};

export const kbNavDummy = {
    mainNodeMap: {},
    subNodeMap: {},
    currentNode: kbMasterNode,
    setCurrentNode: () => null,
    setSubGraph: () => null,
};
