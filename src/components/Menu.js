import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import css from './Map.css';
import mapboxgl from 'mapbox-gl';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

export const Menu = ({ className, variant, onClick, onMapHover, children, disabled }) => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiZWpzYW5kb3ZhbCIsImEiOiJjazVmb3JrZW8yZnplM2Vwb2Voa2ZzcW9rIn0.vdCKHnQ3ApBhX-M2-J-Iag';
	const [zoom, setZoom] = useState(14.5);
	const [lng, setLng] = useState(-70.634);
	const [lat, setLat] = useState(-33.436);

	useEffect(() => {
		const mapbox = new mapboxgl.Map({
			container: mapContainer.current,
			center: [lng, lat],
			zoom: zoom,
			style: 'mapbox://styles/ejsandoval/ck5fot9ly0r881imf81gaabsm'
		});
		mapbox.on('move', () => {
			setZoom(mapbox.getZoom().toFixed(2));
			setLng(mapbox.getCenter().lng.toFixed(4));
			setLat(mapbox.getCenter().lat.toFixed(4));
		});
		// add markers to map
		geojson.features.forEach(function(point) {
			// create a HTML element for each feature
			const el = document.createElement('div');
			el.className = css.marker;

			const description = `<div>
					<h1>${point.properties.title}</h1>
					<p>${point.properties.description}</p>
					<h3>Tipo: ${point.properties.kind}</h3>
				</div>`;
		});
	}, []);

	const classes = classnames(css.root, { [className]: className, [css[variant]]: css[variant] });
	return (
		<Fragment>
			<div></div>
		</Fragment>
	);
};

export default Menu;

Menu.defaultProps = {
	onClick: () => {}
};
