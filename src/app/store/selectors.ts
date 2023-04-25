import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../types/appState.interfcase";

export const selectFeature = (state: AppStateInterface) => state.user;

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading);
export const userSelector = createSelector(selectFeature, (state) => state.user);
export const errorSelector = createSelector(selectFeature, (state) => state.error);
export const selectIsLoggedIn = createSelector(userSelector, user => !!user);
export const agentsList = createSelector(userSelector, user => user?.agents);
export const selectAgent = createSelector(selectFeature, (state) => state.selectedAgent);
export const getToken = createSelector(selectFeature, (state) => state.token);