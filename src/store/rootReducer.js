import { combineReducers } from 'redux'
import { locationReducer } from './HomePage/slice'
import { RoomCommentReducer } from './RoomComment/slice'
import { userManageReducer } from './UserManage/slice'
import { bookingManageReducer } from './BookingManage/slice'
import { LocationManageReducer } from './LocationManage/slice'
import { roomManageReducer } from './RoomManage/slice'
export const rootReducer = combineReducers({
    location:locationReducer,
    RoomComment:RoomCommentReducer,
    UserManage:userManageReducer,
    BookingManage:bookingManageReducer,
    LocationManage:LocationManageReducer,
    RoomManage:roomManageReducer
})
