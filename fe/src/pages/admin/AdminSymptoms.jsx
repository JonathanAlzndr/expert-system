import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/ui/FormInput';
import { useGejala } from '../../hooks/useGejala';

const AdminSymptoms = () => {
    const { gejala, loading, error, createGejala, deleteGejala } = useGejala();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id_gejala: '',
        nama_gejala: '',
        teks_pertanyaan: ''
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setFormError('');

        const result = await createGejala(formData);

        if (result.success) {
            setShowForm(false);
            setFormData({
                id_gejala: '',
                nama_gejala: '',
                teks_pertanyaan: ''
            });
        } else {
            setFormError(result.error);
        }
        setSubmitLoading(false);
    };

    const handleDelete = async (idGejala) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus gejala ini? Tindakan ini juga akan menghapus pertanyaan terkait.')) {
            await deleteGejala(idGejala);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Kelola Data Gejala</h1>
                <Button onClick={() => setShowForm(true)}>
                    <i className="fas fa-plus mr-2"></i> Tambah Gejala
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
                    <Table headers={['ID Gejala', 'Nama Gejala', 'Teks Pertanyaan', 'Aksi']}>
                        {gejala.map((item) => (
                            <tr key={item.id_gejala}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.id_gejala}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.nama_gejala}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.teks_pertanyaan}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                        <i className="fas fa-edit"></i> Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDelete(item.id_gejala)}
                                    >
                                        <i className="fas fa-trash"></i> Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </Card>
            )}

            {/* Modal Form Tambah Gejala */}
            <Modal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                title="Tambah Gejala Baru"
            >
                {formError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="ID Gejala"
                        name="id_gejala"
                        value={formData.id_gejala}
                        onChange={handleInputChange}
                        placeholder="Contoh: G01"
                        required
                    />

                    <FormInput
                        label="Nama Gejala"
                        name="nama_gejala"
                        value={formData.nama_gejala}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama gejala"
                        required
                    />

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Teks Pertanyaan</label>
                        <textarea
                            name="teks_pertanyaan"
                            value={formData.teks_pertanyaan}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Masukkan teks pertanyaan untuk diagnosis"
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

export default AdminSymptoms;
