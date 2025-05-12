import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { text } = attributes;

	return (
		<RichText.Content
			tagName="p"
			{...useBlockProps.save({
				className: 'sd-vacancies__text'
			})}
			value={text}
		/>
	);
}
