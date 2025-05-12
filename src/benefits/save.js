import {
	useBlockProps,
	RichText,
	InnerBlocks
} from '@wordpress/block-editor';
import placeholderImage from './benefits.jpeg';

export default function save({ attributes }) {
	const { mirror, title, image, links } = attributes;
		const ImageTag = () => (
			<img
				src={image?.url || placeholderImage}
				alt={image?.alt || ''}
				loading="lazy"
			/>
		);

	return (
		<section {...useBlockProps.save({ className: 'sd-benefits' })}>
			{title && (
				<RichText.Content
					tagName="h2"
					value={title}
				/>
			)}

			{links && (
				<ul className="snd-tabs">
					{links?.map((link, index) => (
						<li key={index}>
							<a
								href={link.url}
								target={link.target ? '_blank' : '_self'}
							>
								{link.title}
							</a>
						</li>
					))}
				</ul>
			)}

			<div className="sd-benefits__grid">
				{mirror && (
					ImageTag()
				)}

				<div className="sd-benefits__text">
					<InnerBlocks.Content />
				</div>

				{!mirror && (
					ImageTag()
				)}
			</div>
		</section>
	);
}
