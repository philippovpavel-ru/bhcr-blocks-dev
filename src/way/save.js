import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';
import placeholderImage from './way.jpeg';

export default function save({ attributes }) {
	const { mirror, title, description, stepPrefix, image, steps } = attributes;
		const ImageTag = () => (
			<img
				src={image?.url || placeholderImage}
				alt={image?.alt || ''}
				loading="lazy"
			/>
		);

	return (
		<section {...useBlockProps.save({ className: 'sd-way' })}>
			{title && (
				<RichText.Content
					tagName="h2"
					value={title}
				/>
			)}

			<div className="sd-way__grid">
				{mirror && (
					ImageTag()
				)}

				<div className="sd-way__text">
					{description && (
						<RichText.Content
							tagName="h3"
							value={description}
						/>
					)}

					{steps && (
						<ul>
							{steps?.map((step, index) => (
								<li key={index}>
									<span>{`${stepPrefix} ${index + 1}`}</span>
									{step}
								</li>
							))}
						</ul>
					)}
				</div>

				{!mirror && (
					ImageTag()
				)}
			</div>
		</section>
	);
}
