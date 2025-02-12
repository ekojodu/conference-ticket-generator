import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#0a1b1e] text-white'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className='bg-[#102a2d] p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-700'
			>
				<h2 className='text-3xl font-bold text-center border-b border-gray-700 pb-4'>
					ENTER YOUR DETAILS
				</h2>

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
					className='space-y-4'
				>
					{/* Avatar Upload */}
					<div>
						<label className='block text-sm font-medium text-gray-300'>
							Profile Picture
						</label>

						{/* Drag and Drop Box */}
						<div
							className='relative flex flex-col items-center justify-center mt-4 p-4 w-60 h-60 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer mx-auto'
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onClick={() => document.getElementById('avatar-upload').click()} // Trigger file input when the box is clicked
						>
							<p className='text-gray-400 text-center'>
								Drag & Drop your image here
							</p>
							<p className='text-gray-400 text-center'>or</p>
							<p className='text-blue-400 text-center'>Click to select file</p>

							{/* Hidden File Input */}
							<input
								id='avatar-upload'
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className='hidden'
							/>

							{/* Image Preview inside the box */}
							{imageSrc && (
								<img
									src={imageSrc}
									alt='Profile Preview'
									className='absolute inset-0 w-full h-full object-cover rounded-lg'
								/>
							)}
						</div>

						{/* Error Message */}
						{errors.avatar && (
							<span className='text-red-500 text-sm'>{errors.avatar}</span>
						)}
						{loading && (
							<span className='text-blue-500 text-sm'>Uploading image...</span>
						)}
					</div>

					{/* Full Name Input */}
					<div>
						<label className='block text-sm font-medium text-gray-300'>
							Full Name
						</label>
						<input
							type='text'
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							className='w-full p-3 mt-2 border border-gray-600 rounded-lg text-gray-900'
						/>
						{errors.fullName && (
							<span className='text-red-500 text-sm'>{errors.fullName}</span>
						)}
					</div>

					{/* Email Input */}
					<div>
						<label className='block text-sm font-medium text-gray-300'>
							Email Address
						</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full p-3 mt-2 border border-gray-600 rounded-lg text-gray-900'
						/>
						{errors.email && (
							<span className='text-red-500 text-sm'>{errors.email}</span>
						)}
					</div>

					{/* Special Request (Optional) */}
					<div>
						<label className='block text-sm font-medium text-gray-300'>
							Special Request (Optional)
						</label>
						<textarea
							value={specialRequest}
							onChange={(e) => setSpecialRequest(e.target.value)}
							className='w-full p-3 mt-2 border border-gray-600 rounded-lg text-gray-900'
							placeholder='Enter your special request (if any)'
						/>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full mt-6 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition border border-blue-500'
						disabled={loading}
					>
						{loading ? 'Uploading...' : 'Generate Ticket'}
					</button>
				</form>
			</motion.div>
		</div>
	);
}

export default TicketForm;
