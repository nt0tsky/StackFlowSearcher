import { REDIRECT_TO_HOME_ACTION } from './types';
import { BaseAction } from '../common/BaseAction';

export const MovebackAction: () => BaseAction = () => ({
    type: REDIRECT_TO_HOME_ACTION,
    payload: ''
});
