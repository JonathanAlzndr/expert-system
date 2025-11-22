import React, {useState, useEffect} from 'react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import {usePenyakit} from '../../hooks/usePenyakit';
import {useGejala} from '../../hooks/useGejala';
import {useRules} from '../../hooks/useRules';

const AdminDashboard = () => {
    const {penyakit} = usePenyakit();
    const {gejala} = useGejala();
    const {rules} = useRules();
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const activities = [
            {waktu: '10:30 AM', aktivitas: 'Diagnosis penyakit berhasil', pengguna: 'user123'},
            {waktu: '09:15 AM', aktivitas: 'Data gejala diperbarui', pengguna: 'admin'},
            {waktu: '08:45 AM', aktivitas: 'Penyakit baru ditambahkan', pengguna: 'admin'},
        ];
        setRecentActivity(activities);
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold text-primary mb-8">Dashboard Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Jumlah Penyakit</h3>
                            <p className="text-3xl font-bold text-primary mt-2">{penyakit.length}</p>
                        </div>
                        <div className="bg-secondary rounded-full p-3">
                            <i className="fas fa-disease text-2xl text-primary"></i>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Jumlah Gejala</h3>
                            <p className="text-3xl font-bold text-primary mt-2">{gejala.length}</p>
                        </div>
                        <div className="bg-secondary rounded-full p-3">
                            <i className="fas fa-clipboard-list text-2xl text-primary"></i>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Jumlah Rules</h3>
                            <p className="text-3xl font-bold text-primary mt-2">{rules.length}</p>
                        </div>
                        <div className="bg-secondary rounded-full p-3">
                            <i className="fas fa-project-diagram text-2xl text-primary"></i>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>

                <Table headers={['Waktu', 'Aktivitas', 'Pengguna']}>
                    {recentActivity.map((activity, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.waktu}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.aktivitas}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.pengguna}</td>
                        </tr>
                    ))}
                </Table>
            </Card>
        </>
    );
};

export default AdminDashboard;
