import React, { useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router'
import InnerBanner from '../components/InnerBanner'
import { useGetUserQuery, useLogoutUserMutation, userApi } from '../redux/api/userApi'
import { useDispatch } from 'react-redux'

const AdminDashboard = () => {
    const { data } = useGetUserQuery();
    const [logout] = useLogoutUserMutation();
    const user = data?.user || null;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (user && !user?.isAdmin) {
        return <div>You are not authorized to view this page.</div>;
    }


    const handleLogout = async () => {
        try {
            await logout();
            dispatch(userApi.util.resetApiState()); // clears cached getUser immediately
            navigate("/signin", { replace: true });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <InnerBanner title="Admin Dashboard" breadcrumb={[{ title: "Home", url: "/" }, { title: "Admin Dashboard" }]} />
            <div className='flex'>
                <nav className='w-1/4'>
                    <ul>
                        <li><Link to="/admin/inbox">Inbox</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </nav>
                <div className='w-3/4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard


