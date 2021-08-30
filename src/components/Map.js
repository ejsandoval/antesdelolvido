import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import css from './Map.css';
import mapboxgl from 'mapbox-gl';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

const types = {
	Otros: '',
	'Escultura/Monumento': 'escultura',
	Edificio: 'edificio',
	'Mobiliario Urbano': 'mobiliario',
	Muralla: 'muralla'
};

let geojson = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.634394, -33.436933]
			},
			properties: {
				title: 'Plaza de la Dignidad',
				description: 'Plaza de la Dignidad',
				kind: 'Escultura/Monumento',
				url: 'https://sketchfab.com/3d-models/plaza-dignidad-nov25-fc30050d56194fa1a83436e54024129c',
				date: '25/11/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.637016, -33.436528]
			},
			properties: {
				title: 'Roca',
				description: 'Parque Forestal',
				kind: 'Mobiliario Urbano',
				url:
					'https://sketchfab.com/3d-models/roca-parque-forestal-diciembre-19-611459a7208a4013932d7d9d79b67868',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.6299853, -33.4360739]
			},
			properties: {
				title: 'Parroquia Santos Angeles Custodios',
				description: 'Obispo Pérez de Espinoza',
				kind: 'Edificio',
				url: 'https://sketchfab.com/3d-models/angeles-custodios-dec8-b3561b92355c432b9e6485936859cf21',
				date: '08/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.629564, -33.434687]
			},
			properties: {
				title: 'Homenaje Al Doctor Calvo Mackena',
				description: 'Parque Balmaceda, Providencia',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/homenaje-al-doctor-calvo-mackena-7204ca61a74346c0b207e3d0ceafa515',
				date: '15/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.643135, -33.435405]
			},
			properties: {
				title: 'Ícaro y Dédalo',
				description: 'Obra de Rebeca Matte, Frontis Museo Nacional de Bellas Artes',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/icaro-y-dedalo-rebecca-matte-dic15-a5eee9483bb54cad86d2950c60a71a53',
				date: '15/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.6282415, -33.4357876]
			},
			properties: {
				title: 'Muro',
				description: 'Condell 125',
				kind: 'Muralla',
				url: 'https://sketchfab.com/3d-models/condell105-nov26-9878e84ec47944508984d0dc2a96471e',
				date: '26/11/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.625579, -33.431932]
			},
			properties: {
				title: 'Negro Matapacos',
				description: 'Plaza de la Aviación',
				kind: 'Escultura/Monumento',
				url: 'https://sketchfab.com/3d-models/condell105-nov26-9878e84ec47944508984d0dc2a96471e',
				date: '28/11/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.6388867, -33.4390939]
			},
			properties: {
				title: 'Mutual de Seguridad',
				description: "Av Libertador Bernardo O'Higgins 186",
				kind: 'Edificio',
				url: 'https://sketchfab.com/3d-models/mutual-seguridad-nov20-4a70005355004e8abd3a930d1892c924',
				date: '20/11/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-72.9439801, -41.4733225]
			},
			properties: {
				title: 'Sentados Frente Al Mar',
				description: 'Obra de Robinson Barría',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/en19-sentados-frente-al-mar-pto-montt-7da8c902e5814d969338a8827980f5be',
				date: '19/01/2020'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.678236, -33.427128]
			},
			properties: {
				title: 'Esquina Balmaceda y Maipú',
				description: 'Plaza Balmaceda',
				kind: 'Muralla',
				url:
					'https://sketchfab.com/3d-models/dic13-balmaceda-esq-maipu-muro-escalera-3bfc285e02d94177a0677102d7c5dc55',
				date: '13/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.639534, -33.439946]
			},
			properties: {
				title: 'Banca Metro UC',
				description: 'Banca espacio publico rota Sector Metro UC',
				kind: 'Mobiliario Urbano',
				url: 'https://sketchfab.com/3d-models/banca-casa-central-uc-dic19-c86333b709b94a48bb74ea786aca1e5c5',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.638301, -33.438629]
			},
			properties: {
				title: 'Guanaco',
				description: 'Guanaco 50',
				kind: 'Otros',
				url: 'https://sketchfab.com/3d-models/guanaco50-dic19-f6911a06e72546b2ba01e3d8bbff46a7',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.642754, -33.435496]
			},
			properties: {
				title: 'Monumento de la Colonia Francesa al Centenario de Chile',
				description: 'Parque Forestal',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/dic19-monumento-colonia-francesa-27f314c9163b438daab5ca048f971715',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.634357, -33.436933]
			},
			properties: {
				title: 'Encapuchado',
				description: 'Encapuchado sobre plinto de Monumento a General Manuel Baquedano ',
				kind: 'Otros',
				url: 'https://sketchfab.com/3d-models/plaza-dignidad-encapuchado-e7fb1e13c4b240f9a1e3e67289106ff7',
				date: '05/01/2020'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.652144, -33.451445]
			},
			properties: {
				title: 'Pedro Aguirre Cerda',
				description: 'Parque Almagro',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/escultura-pac-parque-almagro-19dic-cc442062359c4d54915665c36c1146c7',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.63493, -33.437097]
			},
			properties: {
				title: 'Monumento Colectivo Originario',
				description: 'Plaza Dignidad',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/monumento-colectivo-originario-diciembre19-26006cc1daf941d2bb76f25fb4d4c93b',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.634928, -33.43712]
			},
			properties: {
				title: 'Monumento Colectivo Originario 2',
				description: 'Plaza Dignidad',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/monumento-colectivo-originario-1-diciembre-19-03419c2bbd1f4fd49ac5bfcb8f414f3d',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [0, 0]
			},
			properties: {
				title: 'Kiosko',
				description: 'Alameda',
				kind: 'Mobiliario Urbano',
				url: 'https://sketchfab.com/3d-models/kiosko-alameda-c-dic19-303e6ae2f2604df48f0bcd44736184fc',
				date: '19/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.634967, -33.436597]
			},
			properties: {
				title: 'Monumento al Genio de la Libertad',
				description: 'Plaza Dignidad',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/lallamadelalibertad-dec15-lowres-676e9c6f1bf1415491e27d3da415d461',
				date: '15/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.635969, -33.436766]
			},
			properties: {
				title: 'Caja misterio',
				description: 'Parque Forestal',
				kind: 'Mobiliario Urbano',
				url:
					'https://sketchfab.com/3d-models/caja-misterio-parque-forestal-dec13-58f921451c824d3d9d34288b762edc5b',
				date: '13/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.634491, -33.443437]
			},
			properties: {
				title: 'Muros',
				description: 'Pasaje Renato Zanelli',
				kind: 'Muralla',
				url: 'https://sketchfab.com/3d-models/pasaje-curico-v-mackenna-dec10-dccbc714fe684f2a9c09e7cdc55efaa2',
				date: '10/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.630477, -33.458019]
			},
			properties: {
				title: 'En memoria a Luisa Aguilar',
				description: 'Esquina Santa Elvira y Santa Elena',
				kind: 'Muralla',
				url:
					'https://sketchfab.com/3d-models/santa-elena-santa-elvira-diciembre-10-1daca821d4d24e2693387ee48f1e20da2',
				date: '10/12/2019'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-70.633198, -33.437416]
			},
			properties: {
				title: 'Monolito',
				description: 'Vestigio de Escultura entre Parque Bustamante y Plaza Dignidad',
				kind: 'Escultura/Monumento',
				url:
					'https://sketchfab.com/3d-models/monolito-sector-plaza-dignidad-dic8-06517ff3ec46482c8b031215e6ad82a6',
				date: '8/12/2019'
			}
		}
	]
};

export const Map = ({ className, variant, onClick, onMapHover, children, disabled, open }) => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiZWpzYW5kb3ZhbCIsImEiOiJjazVmb3JrZW8yZnplM2Vwb2Voa2ZzcW9rIn0.vdCKHnQ3ApBhX-M2-J-Iag';

	const mapContainer = useRef();
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
			const type = types[point.properties.kind];
			el.className = `${css.marker} ${type ? css[type] : ''}`;

			// make a marker for each feature and add to the map
			const marker = new mapboxgl.Marker(el)
				.setLngLat(point.geometry.coordinates)
				// .setPopup(
				// 	new mapboxgl.Popup({ offset: 0 }) // add popups
				// 		.setHTML(description.toString())
				// )
				.addTo(mapbox);
			const markerDiv = marker.getElement();

			markerDiv.addEventListener('mouseenter', () => {
				marker.togglePopup();
				onMapHover(point);
			});
			markerDiv.addEventListener('mouseleave', () => {
				marker.togglePopup();
				onMapHover(point);
			});
		});
	}, []);

	const classes = classnames(css.root, { [className]: className, [css[variant]]: css[variant] });
	return (
		<Fragment>
			<div className={classnames(css.info, { [css.infoRight]: open })}>
				Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
			</div>
			<div className={classes} onClick={onClick} disabled={disabled} ref={mapContainer}>
				{children}
			</div>
		</Fragment>
	);
};

export default Map;

Map.defaultProps = {
	onClick: () => {}
};
