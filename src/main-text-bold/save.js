import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { text } = attributes;

	return (
		<RichText.Content
			tagName="p"
			{...useBlockProps.save({
				className: 'sd-vacancies__text sd-vacancies__text_bold'
			})}
			value={text}
		/>
	);
}
