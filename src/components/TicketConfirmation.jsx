import { useState, useEffect } from 'react';
import Barcode from 'react-barcode'; // Import the barcode component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Ticket = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState('');
	const [ticketType, setTicketType] = useState('');
	const [ticketCount, setTicketCount] = useState('');
	const [specialRequest, setSpecialRequest] = useState('');
	const navigate = useNavigate(); // Hook to handle navigation

	useEffect(() => {
		// Retrieve data from localStorage
		setFullName(localStorage.getItem('fullName') || '');
		setEmail(localStorage.getItem('email') || '');
		setAvatar(localStorage.getItem('avatar') || '');
		setTicketType(localStorage.getItem('ticketType') || 'Regular');
		setTicketCount(localStorage.getItem('ticketCount') || '1');
		setSpecialRequest(localStorage.getItem('specialRequest') || 'N/A');
	}, []);

	const handleNext = () => {
		// Implement your logic for downloading the ticket
	};

	const handleBookAnotherTicket = () => {
		navigate('/'); // Navigate to home or ticket booking page
	};

	return (
		<div className='flex justify-center items-center min-h-screen bg-[#0a1b1e] text-white'>
			{/* Outer background container with increased width */}
			<div className='bg-[#092123] p-8 rounded-3xl shadow-2xl w-full max-w-4xl relative'>
				{/* Heading and message */}
				<div className='text-center mb-8'>
					<h2 className='text-3xl font-semibold mb-2'>
						Ticket Has Been Booked
					</h2>
					<p className='text-lg mb-6'>
						Check your email or you can download your ticket below.
					</p>
				</div>

				{/* Ticket content with reverted width */}
				<div
					className='bg-[#102a2d] p-6 w-full shadow-lg text-center relative rounded-2xl max-w-md mx-auto'
					style={{
						position: 'relative',
						overflow: 'hidden', // To ensure the pseudo-elements don't overflow
					}}
				>
					{/* Event and user info */}
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
						<div className='mt-4 bg-[#0d1f21] p-6 rounded-lg relative border-2 border-teal-500'>
							{/* Name and Email */}
							<div className='mt-4 grid grid-cols-2 gap-0'>
								{/* Name (No Left Border) */}
								<div className='text-left border-b-2 border-dashed border-teal-300 pb-4'>
									<p className='text-gray-400 text-sm'>Name:</p>
									<div className='pt-1 rounded-lg'>
										<span className='font-semibold break-words max-w-full block'>
											{fullName}
										</span>
									</div>
								</div>

								{/* Email (Left Border + Padding) */}
								<div className='text-left border-l-2 border-b-2 border-dashed border-teal-300 pb-4 pl-4'>
									<p className='text-gray-400 text-sm'>Email:</p>
									<div className='pt-1 rounded-lg'>
										{/* Ensures text truncation without overflow */}
										<span className='font-semibold block truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]'>
											{email}
										</span>
									</div>
								</div>

								{/* Ticket Type (No Left Border) */}
								<div className='text-left border-b-2 border-dashed border-teal-300 pb-4'>
									<p className='text-gray-400 text-sm'>Ticket Type:</p>
									<div className='pt-1 rounded-lg'>
										<span className='font-semibold break-words max-w-full block'>
											{ticketType}
										</span>
									</div>
								</div>

								{/* Ticket Count (Left Border + Padding) */}
								<div className='text-left border-l-2 border-b-2 border-dashed border-teal-300 pb-4 pl-4'>
									<p className='text-gray-400 text-sm'>Ticket for:</p>
									<div className='pt-1 rounded-lg'>
										<span className='font-semibold break-words max-w-full block'>
											{ticketCount}
										</span>
									</div>
								</div>

								{/* Special Request (No Left Border) */}
								<div className='col-span-2 text-left'>
									<p className='text-gray-400 text-sm mt-2'>Special request:</p>
									<div className='pt-1 rounded-lg'>
										<span className='text-gray-300 break-words block max-w-full'>
											{specialRequest}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Border separating the details from the QR code */}
						<div className='border-t-4 border-dashed border-teal-900 mt-4'></div>

						{/* QR Code */}
						<div className='mt-4 flex justify-center'>
							<div className='p-2 rounded-lg'>
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

				{/* Buttons under the ticket content with the same width as the ticket */}
				<div className='flex flex-col md:flex-row justify-between mt-6 gap-3 max-w-md mx-auto'>
					<button
						onClick={handleBookAnotherTicket}
						className='flex-1 px-5 py-3 bg-gray-700 rounded-lg'
					>
						Book Another Ticket
					</button>
					<button
						onClick={handleNext}
						className='flex-1 px-5 py-3 bg-teal-500 rounded-lg'
					>
						Download Ticket
					</button>
				</div>
			</div>
		</div>
	);
};

export default Ticket;
