import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    addEventListenersAndReturnHandlers,
    createHeaderMainGraph,
    removeListeners,
} from './kb-navigation-setup';
import {
    setCurrentNode,
    setKbMainGraph,
} from '../../store/reducers/keyboard-nav-duck';
import { KbNaviNode } from './kb-navigation';
import { lukkAlleDropdowns } from '../../store/reducers/dropdown-toggle-duck';
import { AppState } from '../../store/reducers';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    innloggingsStatus: state.innloggingsstatus.data,
    kbNavState: state.kbNavigation,
});

export const useKbNavigationMenyLinje = () => {
    const {
        language,
        arbeidsflate,
        menyStatus,
        innloggingsStatus,
        kbNavState,
    } = useSelector(stateSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const graph = createHeaderMainGraph(
            language,
            arbeidsflate,
            menyStatus,
            innloggingsStatus.authenticated
        );
        if (graph) {
            dispatch(setKbMainGraph(graph));
        }
    }, [language, arbeidsflate, menyStatus, innloggingsStatus]);

    useEffect(() => {
        const handlers = addEventListenersAndReturnHandlers(
            kbNavState.currentNode,
            {
                ...kbNavState.mainGraph.nodeMap,
                ...kbNavState.subGraph?.nodeMap,
            },
            (node: KbNaviNode) => dispatch(setCurrentNode(node)),
            () => dispatch(lukkAlleDropdowns())
        );

        return () => removeListeners(handlers);
    }, [kbNavState]);
};
