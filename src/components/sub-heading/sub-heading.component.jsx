import React from 'react';
import { Move } from 'react-feather';

const SubHeading = ({ summaryStyle }) => (
	<div className="movable sub-heading">
		<p className="handle">
			<Move size="18" />
		</p>
		<p style={summaryStyle} contentEditable suppressContentEditableWarning>
			J. K. ROWLING
		</p>
	</div>
);

export default SubHeading;
