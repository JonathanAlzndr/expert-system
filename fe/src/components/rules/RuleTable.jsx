import React from "react";
import Card from "../ui/Card";
import Table from "../ui/Table";

const RulesTable = ({ rules, onEdit, onDelete, penyakit, gejala, loading, error }) => {
	const getPenyakitName = (idPenyakit) => {
		const penyakitItem = penyakit.find((p) => p.id_penyakit === idPenyakit);
		return penyakitItem ? penyakitItem.nama_penyakit : idPenyakit;
	};

	const getGejalaNames = (premises) => {
		return premises
			.map((idGejala) => {
				const gejalaItem = gejala.find((g) => g.id_gejala === idGejala);
				return gejalaItem ? gejalaItem.nama_gejala : idGejala;
			})
			.join(", ");
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
				{error}
			</div>
		);
	}

	return (
		<Card>
			<Table headers={["ID Ruleset", "Penyakit", "Gejala", "CF Ruleset", "Aksi"]}>
				{rules.map((item) => (
					<tr key={item.id_ruleset}>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id_ruleset}</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							{getPenyakitName(item.id_penyakit)}
						</td>
						<td className="px-6 py-4 text-sm text-gray-500 max-w-md">
							<div className="line-clamp-2">{getGejalaNames(item.premises)}</div>
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.cf_ruleset}</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
							<button
								className="text-blue-600 hover:text-blue-900 mr-3"
								onClick={() => onEdit(item)}
							>
								<i className="fas fa-edit"></i> Ubah
							</button>
							<button
								className="text-red-600 hover:text-red-900"
								onClick={() => onDelete(item.id_ruleset)}
							>
								<i className="fas fa-trash"></i> Hapus
							</button>
						</td>
					</tr>
				))}
			</Table>
		</Card>
	);
};

export default RulesTable;
