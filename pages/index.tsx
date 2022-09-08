import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
	const [title, setTitle] = useState('wait');
	useEffect(() => {
		fetch('/og')
			.then((res) => res.text())
			.then((text) => {
				const HTMLDoc = new DOMParser().parseFromString(text, 'text/html');
				console.log(HTMLDoc);
				const ogTitle = HTMLDoc.querySelector(
					'meta[property="og:title"]'
				)?.getAttribute('content');
				ogTitle && setTitle(ogTitle);
			});
	}, []);
	return (
		<div>
			<div>Home</div>
			<div>{title}</div>
		</div>
	);
};

export default Home;
