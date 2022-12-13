import React from 'react';
import { Move } from 'react-feather';

const Heading = ({ headingStyle }) => (
	<div className="movable heading">
		<p className="handle">
			<Move size="18" />
		</p>
		<h3 style={headingStyle} contentEditable suppressContentEditableWarning>
			Harry Potter and the Half-Blood Prince
		</h3>
	</div>
);

export default Heading;
