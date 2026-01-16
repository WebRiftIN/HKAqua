import React, { useState } from 'react';
import StatsSummary from '../components/Services/StatsSummary';
import ServiceTable from '../components/Services/ServiceTable';
import ServiceDetails from '../components/Services/ServiceDetails';
import Header from '../components/Header';
import axios from 'axios';			
import { backend } from '../App';
import { useEffect } from 'react';

const initialServices = [
	{
		id: "SRV-2024-001",
		customerName: "Rajesh Kumar",
		phone: "+91 9876543210",
		email: "rajesh.kumar@email.com",
		street: "123 MG Road, Koramangala",
		city: "Bangalore",
		pincode: "560034",
		serviceType: "installation",
		installationDate: "2024-01-25",
		installationTime: "10:00 AM",
		status: "scheduled",
		priority: "normal",
		technician: "Ravi Sharma",
		bookingDate: "2024-01-20",
		notes: "New RO installation for 3BHK apartment. Customer prefers morning slot."
	},
	{
		id: "SRV-2024-002",
		customerName: "Priya Sharma",
		phone: "+91 9876543211",
		email: "priya.sharma@email.com",
		street: "456 Park Street, Bandra West",
		city: "Mumbai",
		pincode: "400050",
		serviceType: "repair",
		installationDate: "2024-01-22",
		installationTime: "2:00 PM",
		status: "in-progress",
		priority: "urgent",
		technician: "Amit Patel",
		bookingDate: "2024-01-19",
		notes: "RO not working, showing error E03. Customer reports no water output."
	},
	{
		id: "SRV-2024-003",
		customerName: "Amit Patel",
		phone: "+91 9876543212",
		email: "amit.patel@email.com",
		street: "789 Civil Lines, Sector 15",
		city: "Gurgaon",
		pincode: "122001",
		serviceType: "maintenance",
		installationDate: "2024-01-24",
		installationTime: "11:30 AM",
		status: "scheduled",
		priority: "normal",
		technician: "Suresh Kumar",
		bookingDate: "2024-01-18",
		notes: "6-month maintenance service. Filter replacement required."
	},
	{
		id: "SRV-2024-004",
		customerName: "Sunita Reddy",
		phone: "+91 9876543213",
		email: "sunita.reddy@email.com",
		street: "321 Jubilee Hills, Road No. 36",
		city: "Hyderabad",
		pincode: "500033",
		serviceType: "commercial",
		installationDate: "2024-01-26",
		installationTime: "9:00 AM",
		status: "scheduled",
		priority: "high",
		technician: "Vikram Singh",
		bookingDate: "2024-01-17",
		notes: "Commercial RO installation for office building. 50+ employees."
	},
	{
		id: "SRV-2024-005",
		customerName: "Vikram Singh",
		phone: "+91 9876543214",
		email: "vikram.singh@email.com",
		street: "654 Sector 21, DLF Phase 2",
		city: "Gurgaon",
		pincode: "122002",
		serviceType: "installation",
		installationDate: "2024-01-21",
		installationTime: "3:30 PM",
		status: "completed",
		priority: "normal",
		technician: "Ravi Sharma",
		bookingDate: "2024-01-16",
		notes: "Installation completed successfully. Customer satisfied with service."
	},
	{
		id: "SRV-2024-006",
		customerName: "Meera Joshi",
		phone: "+91 9876543215",
		email: "meera.joshi@email.com",
		street: "987 FC Road, Shivaji Nagar",
		city: "Pune",
		pincode: "411005",
		serviceType: "repair",
		installationDate: "2024-01-23",
		installationTime: "1:00 PM",
		status: "in-progress",
		priority: "urgent",
		technician: "Amit Patel",
		bookingDate: "2024-01-21",
		notes: "Water leakage issue. Emergency repair required."
	}
];

const ServicesPage = () => {
	const [services, setServices] = useState(initialServices);
	const [filteredServices, setFilteredServices] = useState(initialServices);
	const [selectedServiceId, setSelectedServiceId] = useState(null);
	const [serviceTypeFilter, setServiceTypeFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const handleView = id => setSelectedServiceId(id);
	const handleBack = () => setSelectedServiceId(null);

	const handleUpdateStatus = (id, newStatus) => {
		setServices(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
		setFilteredServices(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
	};

	const handleUpdateSchedule = (id, newDate, newTime) => {
		setServices(prev => prev.map(s => s.id === id ? { ...s, installationDate: newDate, installationTime: newTime } : s));
		setFilteredServices(prev => prev.map(s => s.id === id ? { ...s, installationDate: newDate, installationTime: newTime } : s));
	};

	const handleAssignTechnician = (id, technician) => {
		setServices(prev => prev.map(s => s.id === id ? { ...s, technician } : s));
		setFilteredServices(prev => prev.map(s => s.id === id ? { ...s, technician } : s));
	};

	// const listServices = async () => {
	// 	try {
	// 		const { data } = await axios.get(`${backend}/api/admin/getAllServices`)
	// 		if (data.success) {
	// 			setServices(data.services)
	// 			setFilteredServices(data.servi)
	// 		}
	// 	} catch (error) {
	// 		console.error('Error loading services', error)
	// 		// toast.error('Failed to connect to server')
	// 	}
	// }

	// useEffect(() => {
	// 	listServices()
	// }, [])

	const handleDelete = id => {
		if (window.confirm('Are you sure you want to delete this service?')) {
			setServices(prev => prev.filter(s => s.id !== id));
			setFilteredServices(prev => prev.filter(s => s.id !== id));
			setSelectedServiceId(null);
		}
	};

	const handleFilter = () => {
		let filtered = services;
		if (serviceTypeFilter) filtered = filtered.filter(s => s.serviceType === serviceTypeFilter);
		if (statusFilter) filtered = filtered.filter(s => s.status === statusFilter);
		setFilteredServices(filtered);
	};

	React.useEffect(() => {
		handleFilter();
		// eslint-disable-next-line
	}, [serviceTypeFilter, statusFilter, services]);

	const selectedService = services.find(s => s.id === selectedServiceId);

	return (
		<div className="min-h-full bg-gradient-to-br from-blue-50 to-white">
			<Header />
			<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{!selectedServiceId ? (
					<>
						<div className="mb-6">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
								<div>
									<h1 className="text-3xl font-bold text-gray-900 mb-2">Services Management</h1>
									<p className="text-gray-600">Track and manage all service bookings</p>
								</div>
								<div className="mt-4 sm:mt-0 flex space-x-3">
									<select value={serviceTypeFilter} onChange={e => setServiceTypeFilter(e.target.value)} className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-water-blue">
										<option value="">All Services</option>
										<option value="installation">Installation</option>
										<option value="repair">Repair</option>
										<option value="maintenance">Maintenance</option>
										<option value="commercial">Commercial</option>
									</select>
									<select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-water-blue">
										<option value="">All Status</option>
										<option value="scheduled">Scheduled</option>
										<option value="in-progress">In Progress</option>
										<option value="completed">Completed</option>
										<option value="cancelled">Cancelled</option>
									</select>
								</div>
							</div>
						</div>
						<StatsSummary services={services} />
						<ServiceTable services={filteredServices} onView={handleView} onUpdate={handleUpdateStatus} onDelete={handleDelete} />
					</>
				) : (
					<ServiceDetails
						service={selectedService}
						onBack={handleBack}
						onUpdateStatus={handleUpdateStatus}
						onUpdateSchedule={handleUpdateSchedule}
						onAssignTechnician={handleAssignTechnician}
						onDelete={handleDelete}
					/>
				)}
			</main>
		</div>
	);
};

export default ServicesPage;


