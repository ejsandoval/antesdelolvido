import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Select from './Select';
import Input from './Input';
import Button from './Button';

import css from './Uploader.css';

export const Uploader = ({ className, variant, onClick, disabled }) => {
	const [active, setActive] = useState(false);
	const classes = classnames(css.root, {
		[className]: className,
		[css[variant]]: css[variant]
	});

	const clicked = () => {
		setActive(!active);
	};
	return (
		<div className={classes}>
			<div className={css.button}>
				<a href={'https://drive.google.com/drive/folders/1FSEe4IIxA4-iJ1sxFSnRgaNLSle1cMiu?usp=sharing'}>
					Sube tu modelo
				</a>
			</div>
		</div>
	);
};

export default Uploader;

Uploader.defaultProps = {
	onClick: () => {}
};
