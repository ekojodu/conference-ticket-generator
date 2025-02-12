import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Card = forwardRef(({ children, className }, ref) => (
	<div className={`p-4 bg-gray-700 rounded-xl shadow ${className}`} ref={ref}>
		{children}
	</div>
));

Card.displayName = 'Card'; // Set the displayName

// Prop validation
Card.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Card;
