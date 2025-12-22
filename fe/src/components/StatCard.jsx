import React from "react";
import Card from "./Card";

const StatCard = ({ title, count, loading, icon, color = "primary" }) => {
	return (
		<Card className="p-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-semibold text-gray-700">{title}</h3>
					{loading ? (
						<div className="animate-pulse mt-2 h-8 bg-gray-200 rounded w-16"></div>
					) : (
						<p className={`text-3xl font-bold text-${color} mt-2`}>{count}</p>
					)}
				</div>
				<div className="bg-secondary rounded-full p-3">
					<i className={`fas ${icon} text-2xl text-${color}`}></i>
				</div>
			</div>
		</Card>
	);
};

export default StatCard;
