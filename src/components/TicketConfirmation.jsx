import { useState, useEffect } from 'react';
import Barcode from 'react-barcode'; // Import the barcode component
const Ticket = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState('');
	const [ticketType, setTicketType] = useState('');
	const [ticketCount, setTicketCount] = useState('');
	const [specialRequest, setSpecialRequest] = useState('');

	useEffect(() => {
		// Retrieve all data from localStorage
		setFullName(localStorage.getItem('fullName') || '');
		setEmail(localStorage.getItem('email') || '');
		setAvatar(localStorage.getItem('avatar') || '');
		setTicketType(localStorage.getItem('ticketType') || 'Regular');
		setTicketCount(localStorage.getItem('ticketCount') || '1');
		setSpecialRequest(localStorage.getItem('specialRequest') || 'N/A');
	}, []);

	return (
		<div className='flex justify-center items-center min-h-screen bg-[#0a1b1e] text-white'>
			<div className='bg-[#102a2d] p-6 rounded-2xl w-96 shadow-lg text-center'>
				<h2 className='text-xl font-semibold text-gray-200'>
					Your Ticket is Booked!
				</h2>
				<p className='text-gray-400 text-sm'>
					Check your email for a copy or you can{' '}
					<span className='text-blue-400 cursor-pointer'>download</span>
				</p>

				<div className='mt-4 bg-[#0d1f21] p-6 rounded-lg relative'>
					<h3 className='text-lg font-semibold text-gray-300'>
						Techember Fest &apos;25
					</h3>
					<p className='text-sm text-gray-400'>
						📍 04 Rumens Road, Ikoyi, Lagos
					</p>
					<p className='text-sm text-gray-400'>📅 March 15, 2025 | 7:00 PM</p>

					<div className='mt-4 flex justify-center'>
						<img
							src={avatar || 'https://via.placeholder.com/80'}
							alt='Profile'
							className='w-20 h-20 rounded-lg border border-gray-600'
						/>
					</div>

					{/* Ticket Info Grid Layout with Border Separating QR Code */}
					<div className='mt-4 grid grid-cols-2 gap-4'>
						{/* Name and Email */}
						<div className='text-left'>
							<p className='text-gray-400 text-sm'>Name:</p>
							<div className='pt-1 rounded-lg'>
								<span className='font-semibold break-words max-w-full block'>
									{fullName}
								</span>
							</div>
						</div>

						<div className='text-left'>
							<p className='text-gray-400 text-sm'>Email:</p>
							<div className='pt-1 rounded-lg'>
								{/* Ensures text truncation without overflow */}
								<span className='font-semibold block truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]'>
									{email}
								</span>
							</div>
						</div>

						{/* Ticket Type and Count */}
						<div className='text-left'>
							<p className='text-gray-400 text-sm'>Ticket Type:</p>
							<div className='pt-1 rounded-lg'>
								<span className='font-semibold break-words max-w-full block'>
									{ticketType}
								</span>
							</div>
						</div>

						<div className='text-left'>
							<p className='text-gray-400 text-sm'>Ticket for:</p>
							<div className='pt-1 rounded-lg'>
								<span className='font-semibold break-words max-w-full block'>
									{ticketCount}
								</span>
							</div>
						</div>

						{/* Special Request (Spans Entire Width) */}
						<div className='col-span-2 text-left'>
							<p className='text-gray-400 text-sm mt-2'>Special request:</p>
							<div className='pt-1 rounded-lg'>
								<span className='text-gray-300 break-words block max-w-full'>
									{specialRequest}
								</span>
							</div>
						</div>
					</div>

					{/* Border separating the details from the QR code */}
					<div className='border-t border-gray-600 mt-4'></div>

					{/* QR Code */}
					<div className='mt-4 flex justify-center'>
						<div className=' p-2 rounded-lg'>
							<Barcode
								value={`${ticketType}`} // Dynamic value for the barcode
								width={2} // Width of the barcode lines
								height={60} // Height of the barcode
								displayValue={false} // Optionally hide the text under the barcode
								lineColor='white'
								background='transparent'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ticket;
