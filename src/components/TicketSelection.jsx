import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketSelection = () => {
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [numTickets, setNumTickets] = useState(1);
	const [error, setError] = useState('');

	const tickets = [
		{
			type: 'Free',
			price: 'Free',
			access: 'REGULAR ACCESS',
			available: '20/52',
		},
		{ type: 'VIP', price: '$150', access: 'VIP ACCESS', available: '20/52' },
		{ type: 'VVIP', price: '$150', access: 'VVIP ACCESS', available: '20/52' },
	];

	const handleSelect = (ticket) => {
		// Store the selected ticket details in local storage
		localStorage.setItem('ticketType', ticket.type);
		localStorage.setItem('ticketCount', numTickets); // numTickets is the number of tickets selected

		// Optionally, you can also set it to the state if needed
		setSelectedTicket(ticket);
	};

	const navigate = useNavigate();

	const handleNext = () => {
		if (!selectedTicket) {
			setError('Please select a ticket type.');
			return; // Return early if no ticket is selected
		}
		// Navigate to the second page
		navigate('/second-page');
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-[#061B1F] text-white p-6'>
			<div className='w-full max-w-xl bg-[#0D2A30] p-8 rounded-lg shadow-lg'>
				<div className='flex justify-between items-center pb-3'>
					<h2 className='text-xl font-semibold'>Ticket Selection</h2>
					<p className='text-sm'>Step 1/3</p>
				</div>
				<div className='relative w-full'>
					<div className='absolute bottom-0 left-0 w-full h-1 bg-black'>
						<div className='h-full bg-teal-300' style={{ width: '35%' }}></div>
					</div>
				</div>

				<div className='bg-gradient-to-r from-[#0D2A30] to-[#092026] p-8 rounded-lg mt-6 text-center border border-gray-700'>
					<h3 className='text-2xl font-bold'>Techember Fest &apos;25</h3>
					<hr className='my-3 border-gray-700' />
					<p className='text-sm mt-3'>
						Join us for an unforgettable experience at <br /> [Event Name]!
						Secure your spot now.
					</p>
					<p className='mt-3 text-xs'>
						📍 [Event Location] | March 15, 2025 | 7:00 PM
					</p>
				</div>

				<hr className='my-6 border-gray-700' />

				<h3 className='mt-6 text-sm'>Select Ticket Type:</h3>
				<div className='flex flex-col md:flex-row gap-3 mt-3 border border-gray-700 p-6 rounded-lg bg-[#071E22]'>
					{tickets.map((ticket, index) => (
						<div
							key={index}
							onClick={() => handleSelect(ticket)}
							className={`p-8 rounded-lg cursor-pointer text-left flex-1 border ${
								selectedTicket?.type === ticket.type
									? 'border-teal-400 bg-teal-600' // Lighter background when selected
									: 'border-gray-700 bg-[#0A252A]'
							} hover:border-teal-400 transition duration-200`}
						>
							<p className='font-bold'>{ticket.price}</p>
							<p className='text-xs'>{ticket.access}</p>
							<p className='text-xs opacity-75'>{ticket.available}</p>
						</div>
					))}
				</div>
				{error && <p className='text-red-400 text-sm mt-3'>{error}</p>}

				<h3 className='mt-6 text-sm'>Number of Tickets</h3>
				<select
					className='w-full mt-3 p-3 rounded-lg bg-[#092026] text-white border border-gray-700'
					value={numTickets}
					onChange={(e) => setNumTickets(e.target.value)}
				>
					{[...Array(10).keys()].map((n) => (
						<option key={n + 1} value={n + 1}>
							{n + 1}
						</option>
					))}
				</select>

				<div className='flex flex-col md:flex-row justify-between mt-6 gap-3'>
					<button className='flex-1 px-5 py-3 bg-gray-700 rounded-lg'>
						Cancel
					</button>
					<button
						onClick={handleNext}
						className='flex-1 px-5 py-3 bg-teal-500 rounded-lg'
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default TicketSelection;
