import { Action, Dispatch as ReduxDispatch } from 'redux';

export interface Dispatch extends ReduxDispatch<Action> { }
