import { Action, createAction, props } from "@ngrx/store";
import { Agent } from "../models/agent";
import { User } from "../models/user";

export const getUser = createAction('[User] Get User');
export const setUser = createAction('[User] Set User', props<{ user: User }>());
export const setError = createAction('[User] Set Error', props<{ error: string }>());
export const loginUser = createAction('[User] Login User', props<{ userName: string, password: string, changePassword: boolean }>());
export const loginUserSuccess = createAction('[User] Login User Success', props<{ user: User }>());
export const loginUserFailure = createAction('[User] Login User Failure', props<{ error: string }>());
export const forgotpassword = createAction('[User] Forgot Password', props<{ userName: string }>());
export const resetpassword = createAction('[User] Reset Password', props<{ userName: string }>());
export const selectAgent = createAction('[User] Select Agent', props<{ agent: Agent }>());
export const navigateTo = createAction('[User] Navigate To', props<{ url: string }>());
export const setToken = createAction('[User] Set Token', props<{ token: string}>());

export const storageActionType = '@ngrx/store/storage';
export const storageAction = createAction(storageActionType, props<{ payload: string }>());
export type PayloadAction = Action & {
	payload: { user: string[] };
};

export const STORAGE = '@ngrx/store/storage';
export const Storage = createAction(STORAGE, props<{ payload: string }>());
