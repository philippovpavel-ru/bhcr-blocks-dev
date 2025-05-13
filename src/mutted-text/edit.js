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
					placeholder="Mutted Text"
					onChange={(value) =>
						onChangeText('description', value)
					}
				/>
			</div>
		</>
	);
}
