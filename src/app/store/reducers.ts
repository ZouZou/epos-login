import { Action, ActionReducer, ActionReducerMap, createReducer, MetaReducer, on, State } from "@ngrx/store";
import { UserStateInterface } from "./interfaces/user-state.interface";
import * as UserActions from './actions';
import { Keys, localStorageSync, rehydrateApplicationState } from "ngrx-store-localstorage";

export const initialState: UserStateInterface = {
    isLoading: false,
    user: null,
    error: null,
    selectedAgent: null,
    token: null
};

export const reducers = createReducer(
    initialState,
    on(UserActions.getUser, (state: any) => ({ ...state, isLoading: true })),
    on(UserActions.setUser, (state: any, { user }) => ({ ...state, user: user })),
    on(UserActions.setError, (state: any, { error }) => ({ ...state, error: error })),
    on(UserActions.loginUser, (state: any) => ({ ...state, isLoading: true })),
    on(UserActions.loginUserSuccess, (state: any, action) => ({ ...state, isLoading: false, user: action.user })),
    on(UserActions.loginUserFailure, (state: any, action) => ({ ...state, isLoading: false, error: action.error })),
    on(UserActions.selectAgent, (state: any, action) => ({ ...state, selectedAgent: action.agent })),
    on(UserActions.setToken, (state: any, { token }) => ({ ...state, token: token })),
);

export function userReducer(state: UserStateInterface, action: Action): UserStateInterface {
    return reducers(state, action);
}

export interface RootState {
    ["user"]: UserStateInterface;
}

export const initialUserState: RootState = {
    ["user"]: initialState
};

// wrap localStorageSync in an exported function
export const reducer: ActionReducerMap<RootState> = {
    user: reducers
};

export const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state: State<any>, action: any): any => {
        const keys = [
            { user: ['user', 'token'] }
        ];

        const isPayloadAction = 'payload' in action;
        const payloadAction: UserActions.PayloadAction = action as UserActions.PayloadAction;

        if (action.type === UserActions.storageActionType && isPayloadAction && keys.includes(payloadAction.payload)) {
            const rehydratedState = rehydrateApplicationState([payloadAction.payload] as Keys, localStorage, k => k, true);
            return { ...state, ...rehydratedState };
        }

        return localStorageSync({
            keys,
            rehydrate: true,
            storage: sessionStorage
        })(reducer)(state, action);
    }
};

export function localStorageSyncReducer1(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state: State<any>, action: any) => {
        const keys = [
            { user: ['user', 'token'] }
        ];

        if (action.type === UserActions.STORAGE && keys.includes(action.payload)) {
            const rehydratedState = rehydrateApplicationState([action.payload] as Keys, localStorage, k => k, true);
            return { ...state, ...rehydratedState };
        }

        return localStorageSync({
            keys,
            rehydrate: true,
            storage: sessionStorage
        })(reducer)(state, action);
    }
}

export function localStorageSyncReducer2(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
    return localStorageSync({
        keys: [
            { user: ['user', 'token'] }
        ],
        rehydrate: true
    })(reducer);
}

export const metaReducers: Array<MetaReducer<RootState, any>> = [localStorageSyncReducer];