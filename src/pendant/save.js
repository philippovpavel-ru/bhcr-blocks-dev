import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './pendant.jpeg';

export default function save( { attributes } ) {
	const { title, description, link, image } = attributes;
	return (
		<section {...useBlockProps.save({ className: 'sd-pendant' } ) }>
			<div className="container">
				{title && (
					<RichText.Content
						tagName="h2"
						value={title}
					/>
				)}
				{description && (
					<RichText.Content
						tagName="h3"
						value={description}
					/>
				)}
				<div className="sd-pendant__img-box">
					<img src={image?.url || placeholderImage} alt={image?.alt || ''} />
					<div className="sd-contacts__bottom-hr wow animated"></div>
					<div className="sd-contacts__bottom-hr wow animated"></div>
				</div>
			</div>
		</section>
	);
}
