import {ActionTypes as AutentiseringsinfoActionTypes } from './ducks/autentiseringsinfo';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    if (action.type === AutentiseringsinfoActionTypes.HENT_AUTENTISERINGSINFO_OK) {
        const { niva } = action.data;
        (window as any).frontendlogger.event('registrering.security.level', {'Niva3': niva === 3, 'Niva4': niva === 4}, {}); // tslint:disable-line
    }
    next(action);
};