import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const { text } = attributes;

	return (
		<>
			<RichText
				tagName="p"
				{...useBlockProps({
					className: 'sd-vacancies__text',
				})}
				value={text || ''}
				onChange={(value) => setAttributes({
					text: value,
				})}
			/>
		</>
	);
}
