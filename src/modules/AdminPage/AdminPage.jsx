import React, { useEffect } from 'react'
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer'
import { useAuth } from '../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../routes/path';

const AdminPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  useEffect(()=>{
    if (!currentUser||currentUser?.user.role=='USER') {
      navigate(PATH.HOME_PAGE)
    }
  })
  return (
    <div>
      Admin Page
      <ResponsiveDrawer/>
    </div>
  )
}

export default AdminPage
