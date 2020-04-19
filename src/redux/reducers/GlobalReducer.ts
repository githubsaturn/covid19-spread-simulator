import { SIZE_CHANGED } from '../actions/GlobalActions'
import Utils from '../../utils/Utils'

export default function(state = {}, action: { payload: any; type: string }) {
    switch (action.type) {
        case SIZE_CHANGED:
            return { ...state, isMobile: Utils.isMobile() }
        default:
            return state
    }
}
