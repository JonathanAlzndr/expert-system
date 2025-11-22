import React from 'react';

const SymptomForm = ({symptoms, onCertaintyChange}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gejala</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tingkat
                            Keyakinan
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {symptoms.map(symptom => (
                        <tr key={symptom.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{symptom.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <span className="mr-2 text-sm text-gray-500">Tidak yakin</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={symptom.certainty}
                                        onChange={(e) => onCertaintyChange(symptom.id, e.target.value)}
                                        className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-gray-500">Sangat yakin</span>
                                    <span
                                        className="ml-2 w-12 text-center font-medium text-[var(--color-primary)]">{symptom.certainty}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SymptomForm;
