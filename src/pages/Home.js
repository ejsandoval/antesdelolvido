import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/api';
import classnames from 'classnames';

import Map from '../components/Map';
import Uploader from '../components/Uploader';

import Estrella from '../assets/icons/estrella.svg';
import Logo from '../assets/logoescueladearte.svg';

import css from './Home.css';

function importAll(r) {
	return r.keys().map(r);
}

console.log(process.env.NODE_ENV);
let videos;
if (process.env.NODE_ENV == 'production') {
	videos = importAll(require.context('./assets/videos', false, /\.(webm)$/));
} else {
	videos = importAll(require.context('../assets/videos', false, /\.(webm)$/));
}

export default props => {
	const [data, loadData, status] = useApi('/get');
	const [hovered, setHovered] = useState(false);
	const [detail, setDetail] = useState();
	const [current, setCurrent] = useState();

	if (!status.loaded) {
		return <p>Loading ...</p>;
	}

	const onMapHover = point => {
		const { geometry, properties } = point;
		const [lng, lat] = geometry.coordinates;
		const { title, description, kind, url, date } = properties;
		const space = ' ';
		const slash = '/';
		const re1 = new RegExp(space, 'g');
		const re2 = new RegExp(slash, 'g');
		const vidSrc = `/assets/videos/${title.replace(re1, '')}_${date.replace(re2, '-')}.webm`;
		//console.log(videos);
		const vidIndex = videos.findIndex(v => {
			const t = v.split('-');
			//console.log(`${t[0]}-${t[1]}-${t[2]}.webm`);
			//console.log(vidSrc);
			return `${t[0]}-${t[1]}-${t[2]}.webm` === vidSrc;
		});
		const detailContent = (
			<div className={classnames(css.detailContainer, { [css.visible]: true })}>
				<div className={css.vidWrapper} key={`${vidSrc}-${vidIndex}`}>
					{vidIndex !== -1 && (
						<video loop muted autoPlay className={css.video}>
							<source src={videos[vidIndex]} type="video/webm" />
						</video>
					)}
				</div>
				<div className={css.modelDescription}>
					<h2>{title}</h2>
					<h3>{description}</h3>
					<div className={css.data}>
						<label>{`Tipo`}</label>
						<span>{kind}</span>
						<label>{`Posición`}</label>
						<span>{`[${lng}, ${lat}]`}</span>
					</div>
					<a href={url}>{`Descargar modelo`}</a>
				</div>
			</div>
		);
		setDetail(detail => detailContent);
	};

	const clicked = point => {
		const prev = current;
		if (!prev) {
			console.log(point);
		}
		if (prev && prev.name !== point.name) {
			console.log(point);
		}
	};

	return (
		<div className={css.root}>
			<div className={css.header}>
				<div className={css.title}>
					<Estrella className={css.logo} />
					<h1>ANTES DEL OLVIDO</h1>
				</div>
				<p className={css.bajada}>
					Archivo 3D, talleres y performances co-creativas sobre la primavera Chilena del 2019.
				</p>
				<nav className={css.navbar}>
					<h2>
						<a
							href={
								'https://docs.google.com/forms/d/1kb8ZFYmHFj7sOJk53azf1DRzXsmSHDE_V-YQ1HacMkk/viewform?edit_requested=true'
							}>
							TALLERES
						</a>
					</h2>
					<h2>
						<a href={'https://www.youtube.com/watch?v=BQvq5t4XmcI'}>TUTORIAL DE CAPTURA</a>
					</h2>
					<h2>
						<a
							href={
								'https://docs.google.com/document/d/1ZNMJJVqX0oc7TbbYEI0OSE0acT9O-JCAI08Wosb0A0c/edit?usp=sharing'
							}>
							SOBRE NOSOTRXS
						</a>
					</h2>
					<h2>
						<a
							href={
								'https://docs.google.com/document/d/15TfXspm-ftYvo0mTx93Fyn5wXjZtO9UXrEMo2Te4384/edit?usp=sharing'
							}>
							PROYECTOS TEXTOS
						</a>
					</h2>
				</nav>
			</div>
			{detail}
			<Map onMapHover={onMapHover} open={!detail ? true : false} />
			<Uploader />
			<div className={classnames(css.disclaimer, { [css.disclaimerRight]: detail })}>
				<span>
					<p>
						Página realizada con el aporte de la Dirección de Artes y Cultura, Vicerrectoría de
						Investigación de la Pontificia Universidad Católica de Chile.
					</p>
				</span>
				<span>
					<Logo className={css.logouc} />
				</span>
			</div>
		</div>
	);
};
