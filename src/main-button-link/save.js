import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { link } = attributes;

	return (
		<RichText.Content
			tagName="a"
			{...useBlockProps.save({
				className: 'sd-404__link',
				href: link?.url || '',
				target: link?.target ? '_blank' : '_self'
			})}
			value={link.title}
		/>
	);
}
