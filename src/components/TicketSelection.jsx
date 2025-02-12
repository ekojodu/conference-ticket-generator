import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function TicketSelection() {
	const [ticketType, setTicketType] = useState(
		localStorage.getItem('ticketType') || 'Regular'
	);
	const [ticketCount, setTicketCount] = useState(
		localStorage.getItem('ticketCount') || '1'
	);

	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem('ticketType', ticketType);
		localStorage.setItem('ticketCount', ticketCount);
	}, [ticketType, ticketCount]);

	const handleNext = () => {
		navigate('/second-page');
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#0a1b1e] p-6 text-white'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className='bg-[#102a2d] p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-700'
			>
				<h2 className='text-3xl font-bold text-center border-b border-gray-700 pb-4'>
					Techember Fest &apos;25
				</h2>
				<p className='text-center mt-4 text-gray-400'>
					Join us for an unforgettable experience at TechFest! Secure your spot
					now.
				</p>
				<p className='text-center mt-2 text-gray-400 border-b border-gray-700 pb-4'>
					📍 Lagos, Nigeria | 📅 March 15, 2025 | ⏰ 7:00 PM
				</p>

				<div className='mt-6 border border-gray-700 p-6 rounded-lg'>
					<h3 className='text-lg font-semibold mb-3'>Select Ticket Type:</h3>
					<div className='flex flex-row gap-4'>
						<button
							onClick={() => setTicketType('Regular')}
							className={`p-6 w-1/3 rounded-lg border text-left ${
								ticketType === 'Regular'
									? 'bg-blue-500 text-white border-blue-400'
									: 'bg-[#0d1f21] border-gray-600'
							}`}
						>
							<span className='block text-lg font-semibold'>Free</span>
							<span className='block text-sm mt-1'>REGULAR ACCESS</span>
							<span className='block text-xs text-gray-400 mt-1'>20/52</span>
						</button>
						<button
							onClick={() => setTicketType('VIP')}
							className={`p-6 w-1/3 rounded-lg border text-left ${
								ticketType === 'VIP'
									? 'bg-blue-500 text-white border-blue-400'
									: 'bg-[#0d1f21] border-gray-600'
							}`}
						>
							<span className='block text-lg font-semibold'>$150</span>
							<span className='block text-sm mt-1'>VIP ACCESS</span>
							<span className='block text-xs text-gray-400 mt-1'>20/52</span>
						</button>
						<button
							onClick={() => setTicketType('VVIP')}
							className={`p-6 w-1/3 rounded-lg border text-left ${
								ticketType === 'VVIP'
									? 'bg-blue-500 text-white border-blue-400'
									: 'bg-[#0d1f21] border-gray-600'
							}`}
						>
							<span className='block text-lg font-semibold'>$150</span>
							<span className='block text-sm mt-1'>VVIP ACCESS</span>
							<span className='block text-xs text-gray-400 mt-1'>20/52</span>
						</button>
					</div>
				</div>

				<div className='mt-6 border border-gray-700 p-6 rounded-lg'>
					<h3 className='text-lg font-semibold mb-3'>Number of Tickets:</h3>
					<select
						value={ticketCount}
						onChange={(e) => setTicketCount(e.target.value)}
						className='w-full p-3 mt-2 border border-gray-600 rounded-lg text-gray-900'
					>
						{[...Array(3).keys()].map((num) => (
							<option key={num + 1} value={num + 1}>
								{num + 1}
							</option>
						))}
					</select>
				</div>

				<button
					onClick={handleNext}
					className='w-full mt-6 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition border border-blue-500'
				>
					Next
				</button>
			</motion.div>
		</div>
	);
}

export default TicketSelection;
