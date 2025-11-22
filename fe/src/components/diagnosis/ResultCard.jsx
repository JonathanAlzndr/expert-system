import React from 'react';
import Card from '../ui/Card';

const ResultCard = ({ disease, percentage, description }) => {
    return (
        <Card className="p-6 mb-8">
            <div className="flex items-center mb-4">
                <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <i className="fas fa-check"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Hasil Utama</h2>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{disease}</h3>
                        <p className="text-gray-600 mt-2">{description}</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{percentage}%</div>
                        <div className="text-sm text-gray-500">Tingkat Keyakinan</div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ResultCard;
