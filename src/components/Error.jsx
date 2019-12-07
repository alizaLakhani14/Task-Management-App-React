import React from 'react';
import './Error.css';

const Error = ({ message }) => {
	if (message) {
		return <div className="invalid">{message}</div>;
	}
};

export default Error;
