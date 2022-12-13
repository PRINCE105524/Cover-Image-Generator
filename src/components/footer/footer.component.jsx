import React from 'react';
import { Twitter, GitHub, Instagram } from 'react-feather';

import './footer.styles.scss';

export default function Footer(currentMode) {
	return (
		<>
		<footer>
			<div>
				<a href="#" target="_BLANK" rel="noopener noreferrer">
					Generate Awesome Book Cover
				</a>
			</div>
			<div className="mtb-15">
				All Right Reserved By <a href="#" target="_BLANK" rel="noopener noreferrer">PriEm Studio@2022</a>
			</div>
			<div className="mtb-15 socialLinks">
				<a href="#" target="_BLANK" rel="noopener noreferrer">
					<Twitter size="18" />
				</a>

				<a href="#" target="_BLANK" rel="noopener noreferrer">
					<GitHub size="18" />
				</a>

				<a href="#" target="_BLANK" rel="noopener noreferrer">
					<Instagram size="18" />
				</a>
			</div>
		</footer>
		</>
	);
}
