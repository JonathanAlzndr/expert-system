import React, {useState} from 'react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/ui/FormInput';
import {usePenyakit} from '../../hooks/usePenyakit';

const AdminDiseases = () => {
    const {penyakit, loading, error, createPenyakit, deletePenyakit} = usePenyakit();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id_penyakit: '',
        nama_penyakit: '',
        deskripsi: '',
        solusi: ''
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setFormError('');

        const result = await createPenyakit(formData);

        if (result.success) {
            setShowForm(false);
            setFormData({
                id_penyakit: '',
                nama_penyakit: '',
                deskripsi: '',
                solusi: ''
            });
        } else {
            setFormError(result.error);
        }
        setSubmitLoading(false);
    };

    const handleDelete = async (idPenyakit) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus penyakit ini?')) {
            await deletePenyakit(idPenyakit);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Kelola Data Penyakit</h1>
                <Button onClick={() => setShowForm(true)}>
                    <i className="fas fa-plus mr-2"></i> Tambah Penyakit
                </Button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <Card>
                    <Table headers={['ID Penyakit', 'Nama Penyakit', 'Deskripsi', 'Aksi']}>
                        {penyakit.map((item) => (
                            <tr key={item.id_penyakit}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.id_penyakit}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.nama_penyakit}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.deskripsi}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                        <i className="fas fa-edit"></i> Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDelete(item.id_penyakit)}
                                    >
                                        <i className="fas fa-trash"></i> Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </Card>
            )}

            {/* Modal Form Tambah Penyakit */}
            <Modal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                title="Tambah Penyakit Baru"
            >
                {formError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="ID Penyakit"
                        name="id_penyakit"
                        value={formData.id_penyakit}
                        onChange={handleInputChange}
                        placeholder="Contoh: P01"
                        required
                    />

                    <FormInput
                        label="Nama Penyakit"
                        name="nama_penyakit"
                        value={formData.nama_penyakit}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama penyakit"
                        required
                    />

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Masukkan deskripsi penyakit"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Solusi</label>
                        <textarea
                            name="solusi"
                            value={formData.solusi}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Masukkan solusi penanganan"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            className="mr-2"
                            onClick={() => setShowForm(false)}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={submitLoading}>
                            {submitLoading ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminDiseases;
