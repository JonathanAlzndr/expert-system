import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminSidebar from '../common/AdminSidebar';
import Footer from '../common/Footer';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
                <AdminSidebar/>
                <div className="flex-grow bg-gray-100">
                    <div className="p-8">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default AdminLayout;
