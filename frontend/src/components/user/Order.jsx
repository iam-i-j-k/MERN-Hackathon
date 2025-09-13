import React, { useEffect, useState } from "react";

export default function Order() {
	const [orders, setOrders] = useState([]);

			useEffect(() => {
				const stored = localStorage.getItem("orders");
				setOrders(stored ? JSON.parse(stored) : []);
			}, []);

	return (
		<div className="max-w-xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">Order Details</h1>
			{orders.length === 0 ? (
				<p className="text-center text-gray-500">No orders placed yet.</p>
			) : (
				orders.map((order) => (
					<div key={order.id} className="bg-white rounded-lg shadow p-4 mb-6">
						<p className="font-semibold mb-2">Order ID: {order.id}</p>
						<ul className="mb-4">
							{order.items.map((item, idx) => (
								<li key={idx} className="flex justify-between py-1">
									<span>{item.name} x {item.quantity}</span>
									<span>{item.price}</span>
								</li>
							))}
						</ul>
						<p className="font-bold text-lg">Total: {order.total}</p>
						<div className="mt-4 text-center">
							<span className="inline-block px-4 py-2 rounded bg-orange-100 text-orange-700 font-semibold">
								Status: {order.status}
							</span>
						</div>
						{order.address && (
							<div className="mt-2 text-sm text-gray-600">Delivery Address: {order.address}</div>
						)}
						{order.payment && (
							<div className="mt-1 text-sm text-gray-600">Payment Mode: {order.payment}</div>
						)}
					</div>
				))
			)}
		</div>
	);
}