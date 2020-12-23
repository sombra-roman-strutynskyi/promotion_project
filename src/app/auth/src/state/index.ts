// start:ng42.barrel
import {union} from '@ngrx/store';
import {AuthActions} from './auth.actions';

const all = union(AuthActions);
export type AuthActionsUnion = typeof all;

export * from './auth.actions';
export * from './auth.reducer';
export * from './auth.selectors';
// end:ng42.barrel
