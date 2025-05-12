import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './club.jpeg';

export default function save({ attributes }) {
	const { title, description, link, image } = attributes;

	return (
		<section {...useBlockProps.save({ className: 'sd-club' })}>
			{image.url ? (
				<img src={image.url} alt={image.alt} loading="lazy" />
			) : (
				<img src={placeholderImage} loading="lazy" />
			)}

			<div className="container">
				{title && (
					<RichText.Content
						tagName="h2"
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
						className="sd-club__link"
						value={link.title + ' →'}
					/>
				)}
			</div>
		</section>
	);
}
