import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animation

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
				{/* Motion.div wrapper for animated content */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className='bg-[#102a2d] p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-700'
					aria-labelledby='ticket-selection-heading'
				>
					<div className='border border-gray-700 p-4 rounded-lg'>
						<h2
							id='ticket-selection-heading'
							className='text-3xl font-bold text-center border-b border-gray-700 pb-4'
						>
							Techember Fest &apos;25
						</h2>
						<p className='text-center mt-4 text-gray-400'>
							Join us for an unforgettable experience at TechFest! Secure your
							spot now.
						</p>
						<p className='text-center mt-2 text-gray-400  pb-4'>
							📍 Lagos, Nigeria | 📅 March 15, 2025 | ⏰ 7:00 PM
						</p>
					</div>
					<hr className='border-t border-gray-700 mt-4' />
					{/* Ticket selection content */}
					<div className='mt-6 border border-gray-700 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold mb-3' id='ticket-type-heading'>
							Select Ticket Type:
						</h3>
						<div className='flex flex-col sm:flex-row sm:gap-4'>
							{tickets.map((ticket) => (
								<button
									key={ticket.type}
									onClick={() => handleSelect(ticket)}
									aria-pressed={selectedTicket?.type === ticket.type}
									aria-labelledby='ticket-type-heading'
									className={`p-6 w-full sm:w-1/3 rounded-lg border text-left mb-4 sm:mb-0 ${
										selectedTicket?.type === ticket.type
											? 'bg-teal-500 text-white border-blue-400'
											: 'bg-[#0d1f21] border-gray-600'
									}`}
								>
									<span className='block text-lg font-semibold'>
										{ticket.price}
									</span>
									<span className='block text-sm mt-1'>{ticket.access}</span>
									<span className='block text-xs text-gray-400 mt-1'>
										{ticket.available}
									</span>
								</button>
							))}
						</div>
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
				</motion.div>
			</div>
		</div>
	);
};

export default TicketSelection;
