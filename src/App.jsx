import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import { PATH } from "./routes/path";
import HomePage from "./modules/HomePage/HomePage";
import AdminPage from "./modules/AdminPage/AdminPage";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import SignIn from "./modules/auth/SignIn/SignIn";
import SignUp from "./modules/auth/SignUp/SignUp";
import RoomListPage from "./modules/RoomListPage";
import RoomDetailPage from "./modules/RoomListPage/RoomDetailPage/RoomDetailPage";
import RoomLayout from "./layouts/RoomLayout/RoomLayout";
import UserInfo from "./modules/UserInfo/UserInfo";
import { UserProvider } from "./UserContext/UserContext";
import UserInfoLayout from "./layouts/UserInfoLayout/UserInfoLayout";
import UserInfoEdit from "./modules/UserInfo/UserInfoEdit/UserInfoEdit";
import AdminInfo from "./modules/AdminInfo/AdminInfo";
import AdminInfoLayout from "./layouts/AdminInfoLayout/AdminInfoLayout";
import AdminInfoEdit from "./modules/AdminInfo/AdminInfoEdit/AdminInfoEdit";
import UserDetailAdmin from "./modules/AdminPage/UserManagePage/UserDetailAdmin";
import UserEditAdmin from "./modules/AdminPage/UserManagePage/UserEditAdmin";
import AddUserAdmin from "./modules/AdminPage/UserManagePage/AddUserAdmin";
import BookingDetailAdmin from "./modules/AdminPage/BookingManagePage/BookingDetailAdmin";
import BookingEditAdmin from "./modules/AdminPage/BookingManagePage/BookingEditAdmin";
import AddBookingAdmin from "./modules/AdminPage/BookingManagePage/AddBookingAdmin";
import LocationDetailAdmin from "./modules/AdminPage/LocationManagePage/LocationDetailAdmin";
import LocationEditAdmin from "./modules/AdminPage/LocationManagePage/LocationEditAdmin";
import AddLocationAdmin from "./modules/AdminPage/LocationManagePage/AddLocationAdmin";
import RoomDetailAdmin from "./modules/AdminPage/RoomManagePage/RoomDetailAdmin";
import RoomEditAdmin from "./modules/AdminPage/RoomManagePage/RoomEditAdmin";
import AddRoomAdmin from "./modules/AdminPage/RoomManagePage/AddRoomAdmin";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.HOME_PAGE} element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PATH.SIGN_IN} element={<SignIn />} />
            <Route path={PATH.SIGN_UP} element={<SignUp />} />
            <Route path={PATH.ROOM_PAGE} element={<RoomLayout />}>
              <Route index element={<RoomListPage />} />
              <Route path={PATH.ROOM_DETAIL} element={<RoomDetailPage />} />
            </Route>
            <Route path={PATH.USER_INFO} element={<UserInfoLayout/>}>
            <Route index  element={<UserInfo />} />
            <Route path={PATH.USER_INFO_EDIT} element={<UserInfoEdit/>}/>
            </Route>
          </Route>
          <Route path={PATH.ADMIN_PAGE} element={<AdminLayout />}>
            <Route index element={<AdminPage />}/>
            <Route path={PATH.ADMIN_INFO} element={<AdminInfoLayout/>}>
          <Route index  element={<AdminInfo/>} />
          <Route path={PATH.ADMIN_INFO_EDIT}  element={<AdminInfoEdit/>}/>
            </Route>
            <Route path={PATH.ADMIN_USER_DETAIL} element={<UserDetailAdmin/>} />
          <Route path={PATH.ADMIN_USER_EDIT} element={<UserEditAdmin/>}/>
            <Route path={PATH.ADMIN_USER_ADD} element={<AddUserAdmin/>} />
            <Route path={PATH.ADMIN_BOOKING_DETAIL} element={<BookingDetailAdmin/>}/>
            <Route path={PATH.ADMIN_BOOKING_EDIT} element={<BookingEditAdmin/>}/>
            <Route path={PATH.ADMIN_BOOKING_ADD} element={<AddBookingAdmin/>}/>
            <Route path={PATH.ADMIN_LOCATION_DETAIL} element={<LocationDetailAdmin/>}/>
            <Route path={PATH.ADMIN_LOCATION_EDIT} element={<LocationEditAdmin/>}/>
            <Route path={PATH.ADMIN_LOCATION_ADD} element= {<AddLocationAdmin/>} />
            <Route path={PATH.ADMIN_ROOM_DETAIL} element={<RoomDetailAdmin/>}/>
            <Route path = {PATH.ADMIN_ROOM_EDIT} element={<RoomEditAdmin/>}/>
            <Route path={PATH.ADMIN_ROOM_ADD} element={<AddRoomAdmin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
