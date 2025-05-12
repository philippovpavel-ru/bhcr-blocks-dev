import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './in1.jpeg';

export default function save({ attributes }) {
	const { title, description, image } = attributes;
	return (
		<div {...useBlockProps.save({ className: 'swiper-slide sd-ingredients__card' })}>
			<img src={image?.url || placeholderImage} />

			<div className="sd-ingredients__card-text">
				{title && (
					<>
						<RichText.Content
							tagName="h4"
							value={title}
						/>
					</>
				)}
				<a></a>
				{description && (
					<RichText.Content
						tagName="p"
						value={description}
					/>
				)}
			</div>
		</div>
	);
}
