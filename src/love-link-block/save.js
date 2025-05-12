import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './love2.jpeg';

export default function save({ attributes }) {
	const { link, image } = attributes;

	return (
		<section {...useBlockProps.save({ className: 'sd-love__link-box' })}>
			{image?.show && (
				<img src={image?.url || placeholderImage} alt={image?.alt || ''} loading="lazy" />
			)}

			{(link.show && link.url) && (
				<RichText.Content
					tagName="a"
					href={link.url}
					target={link.target ? '_blank' : '_self'}
					value={link.title + ' →'}
				/>
			)}
		</section>
	);
}
