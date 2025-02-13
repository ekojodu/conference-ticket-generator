import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function TicketForm() {
	const [fullName, setFullName] = useState(
		localStorage.getItem('fullName') || ''
	);
	const [specialRequest, setSpecialRequest] = useState(
		localStorage.getItem('specialRequest') || ''
	);
	const [email, setEmail] = useState(localStorage.getItem('email') || '');
	const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [imageSrc, setImageSrc] = useState('');

	// Save user details in localStorage
	useEffect(() => {
		localStorage.setItem('fullName', fullName);
		localStorage.setItem('email', email);
		localStorage.setItem('avatar', avatar);
		localStorage.setItem('specialRequest', specialRequest);
	}, [fullName, email, avatar, specialRequest]);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {};

		if (!fullName) newErrors.fullName = 'Full Name is required';
		if (!email || !/\S+@\S+\.\S+/.test(email))
			newErrors.email = 'Valid email is required';
		if (!avatar) newErrors.avatar = 'Profile picture is required';

		if (Object.keys(newErrors).length === 0) {
			localStorage.setItem(
				'ticket',
				JSON.stringify({ fullName, email, avatar })
			);
			navigate('/last-page');
		} else {
			setErrors(newErrors);
		}
	};

	// Handle file upload to Cloudinary
	const handleFileChange = async (e) => {
		const file = e.target.files[0];

		if (!file) {
			setImageSrc('');
			setErrors({ avatar: 'Please select a file.' });
			return;
		}

		// Check file type
		const validImageTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
		];
		if (!validImageTypes.includes(file.type)) {
			setErrors({
				avatar:
					'Selected file must be a valid image (PNG, JPG, JPEG, GIF, etc.).',
			});
			setImageSrc('');
			return;
		}

		// Upload to Cloudinary
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'conference-ticket-generator');

		try {
			const response = await fetch(
				'https://api.cloudinary.com/v1_1/dazfkhblv/image/upload',
				{
					method: 'POST',
					body: formData,
				}
			);

			const data = await response.json();

			console.log('Cloudinary Response:', data); // Debugging Cloudinary response

			if (data.secure_url) {
				setAvatar(data.secure_url); // Store Cloudinary image URL
				setImageSrc(data.secure_url); // Preview uploaded image
				setErrors({ avatar: '' }); // Clear errors
			} else {
				setErrors({ avatar: 'Image upload failed. Please try again.' });
				setImageSrc(''); // Reset image preview on error
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			setErrors({ avatar: 'Image upload failed. Please try again.' });
			setImageSrc(''); // Reset image preview on error
		}
	};

	// Handle drag and drop events
	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) {
			handleFileChange({ target: { files: [file] } });
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#061B1F] text-white'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className='bg-[#0D2A30] p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-700'
			>
				<div className='flex justify-between items-center pb-3'>
					<h2 className='text-xl font-semibold'>Fill Your Details</h2>
					<p className='text-sm'>Step 2/3</p>
				</div>
				<div className='relative w-full'>
					<div className='absolute bottom-0 left-0 w-full h-1 bg-black'>
						<div className='h-full bg-teal-300' style={{ width: '65%' }}></div>
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
							e.preventDefault(); // Prevent accidental form submission
							if (e.target.tagName === 'BUTTON' || e.target.type === 'submit') {
								handleSubmit(e);
							}
						}
					}}
					className='space-y-4 pt-4'
					aria-live='polite'
				>
					{/* Avatar Upload */}
					<div className='relative'>
						{/* Black Square Background (centered and behind, with adjusted position) */}
						<div className='absolute inset-x-0 top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-32px] bg-gray-800 w-[90%] h-24 z-0'></div>

						{/* Container for Border */}
						<div className='relative border-4 border-gray-700 rounded-lg p-4 z-10'>
							<label
								htmlFor='avatar-upload'
								className='block text-sm font-medium text-gray-300'
							>
								Profile Picture
							</label>

							{/* Drag and Drop Box (perfect square, centered text, increased border radius) */}
							<div
								className='relative flex flex-col items-center justify-center mt-4 pt-4 pb-10 w-60 h-36 bg-teal-700 border-2 border-solid border-blue-500 rounded-xl cursor-pointer mx-auto z-20'
								onDrop={handleDrop}
								onDragOver={handleDragOver}
								onClick={() => document.getElementById('avatar-upload').click()} // Trigger file input when the box is clicked
							>
								<FontAwesomeIcon
									icon={faDownload}
									className='text-gray-400 mb-2'
								/>
								<p className='text-gray-400 text-center'>
									Drag & Drop your image here
								</p>

								{/* Hidden File Input */}
								<input
									id='avatar-upload'
									type='file'
									accept='image/*'
									onChange={handleFileChange}
									className='hidden'
									aria-describedby='avatar-error'
								/>

								{/* Image Preview inside the box */}
								{imageSrc && (
									<img
										src={imageSrc}
										alt='Profile Preview'
										className='absolute inset-0 w-full h-full object-cover rounded-xl'
									/>
								)}
							</div>

							{/* Error Message */}
							{errors.avatar && (
								<span
									id='avatar-error'
									className='text-red-500 text-sm'
									role='alert'
								>
									{errors.avatar}
								</span>
							)}
							{loading && (
								<span className='text-blue-500 text-sm'>
									Uploading image...
								</span>
							)}
						</div>
					</div>

					{/* Full Name Input */}
					<div>
						<label
							htmlFor='full-name'
							className='block text-sm font-medium text-gray-300'
						>
							Full Name
						</label>
						<input
							id='full-name'
							type='text'
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							className='w-full p-3 mt-2 border border-gray-600 rounded-lg text-gray-900 bg-[#092026]'
							aria-describedby='full-name-error'
						/>
						{errors.fullName && (
							<span
								id='full-name-error'
								className='text-red-500 text-sm'
								role='alert'
							>
								{errors.fullName}
							</span>
						)}
					</div>

					{/* Email Input */}
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-300'
						>
							Email Address
						</label>
						<input
							id='email'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full p-3 mt-2 border border-gray-600 rounded-lg text-gray-900 bg-[#092026]'
							aria-describedby='email-error'
						/>
						{errors.email && (
							<span
								id='email-error'
								className='text-red-500 text-sm'
								role='alert'
							>
								{errors.email}
							</span>
						)}
					</div>

					{/* Special Request (Optional) */}
					<div>
						<label
							htmlFor='special-request'
							className='block text-sm font-medium text-gray-300'
						>
							Special Request (Optional)
						</label>
						<textarea
							id='special-request'
							value={specialRequest}
							onChange={(e) => setSpecialRequest(e.target.value)}
							className='w-full p-3 mt-2 border border-gray-600 rounded-lg text-gray-900 bg-[#092026]'
							placeholder='Enter your special request (if any)'
						/>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full mt-6 bg-teal-500 text-white py-4 rounded-lg hover:bg-teal-600 transition border border-teal-400'
						disabled={loading}
						aria-live='polite'
					>
						{loading ? 'Uploading...' : 'Generate Ticket'}
					</button>
				</form>
			</motion.div>
		</div>
	);
}

export default TicketForm;
