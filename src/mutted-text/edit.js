import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

export default function Edit({ attributes }) {
	const { description } = attributes;

	return (
		<>
			<div {...useBlockProps()}>
				<RichText
					tagName="span"
					value={description || ''}
					onChange={(value) =>
						onChangeText('description', value)
					}
				/>
			</div>
		</>
	);
}
