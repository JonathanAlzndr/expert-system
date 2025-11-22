import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LandingPage from './pages/public/LandingPage';
import DiagnosisPage from './pages/public/DiagnosisPage';
import ResultPage from './pages/public/ResultPage';
import DiseasesPage from './pages/public/DiseasesPage';
import LoginPage from './pages/public/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDiseases from './pages/admin/AdminDiseases';
import AdminSymptoms from './pages/admin/AdminSymptoms';
import AdminRules from './pages/admin/AdminRules';
import AdminLayout from './components/layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import './index.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/diagnosis" element={<DiagnosisPage/>}/>
                    <Route path="/result" element={<ResultPage/>}/>
                    <Route path="/diseases" element={<DiseasesPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>

                    {/* Protected Admin Routes dengan Layout */}
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminLayout/>
                        </ProtectedRoute>
                    }>
                        <Route index element={<AdminDashboard/>}/>
                        <Route path="diseases" element={<AdminDiseases/>}/>
                        <Route path="symptoms" element={<AdminSymptoms/>}/>
                        <Route path="rules" element={<AdminRules/>}/>
                    </Route>

                    {/* Redirect unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
