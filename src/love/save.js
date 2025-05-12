import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';
import placeholderImage from './love.jpeg';

export default function save({ attributes }) {
	const { type, mirror, image } = attributes;

	return (
		<section {...useBlockProps.save({ className: `sd-love sd-${type}` })}>
			<div className="container">
				{mirror && (
					<img
						className="sd-love__img"
						src={image?.url || placeholderImage}
						alt={image?.alt || ''}
						loading="lazy"
					/>
				)}

				<div className="sd-love__text-box">
					<InnerBlocks.Content />
				</div>

				{!mirror && (
					<img
						className="sd-love__img"
						src={image?.url || placeholderImage}
						alt={image?.alt || ''}
						loading="lazy"
					/>
				)}
			</div>
		</section>
	);
}
