import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './blog1.jpeg';

export default function save({ attributes }) {
	const { title, description, link, image } = attributes;

	return (
		<div {...useBlockProps.save({ className: 'sd-blog__card' })}>
			{image.url ? (
				<img src={image.url} alt={image.alt} loading="lazy" />
			) : (
				<img src={placeholderImage} loading="lazy" />
			)}

			{title && (
				<RichText.Content
					tagName="h3"
					value={title}
				/>
			)}

			{description && (
				<RichText.Content
					tagName="p"
					value={description}
				/>
			)}

			{(link.show && link.url) && (
				<RichText.Content
					tagName="a"
					href={link.url}
					target={link.target ? '_blank' : '_self'}
					className="sd-blog__card-link"
					value={link.title + ' →'}
				/>
			)}
		</div>
	);
}
