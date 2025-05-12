import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import placeholderImage from './t2.jpeg';

export default function save({ attributes }) {
	const { title, description, subtitle, text_technologies, image, mirror } = attributes;
	const imageTag = () => (
		<img src={image?.url || placeholderImage} className="sd-technologies__img" />
	);

	return (
		<section {...useBlockProps.save({ className: 'sd-technologies' })}>
			{title && (
				<>
					<RichText.Content
						tagName="h2"
						value={title}
					/>
				</>
			)}

			{description && (
				<RichText.Content
					tagName="h3"
					value={description}
				/>
			)}
			<div className="sd-technologies__grid">
				{mirror && (
					imageTag()
				)}
				<div className="sd-technologies__text">
					{subtitle && (
						<>
							<RichText.Content
								tagName="h4"
								value={subtitle}
							/>
						</>
					)}
					{text_technologies && (
						<>
							<RichText.Content
								tagName="p"
								value={text_technologies}
							/>
						</>
					)}
					<InnerBlocks.Content />
				</div>

				{!mirror && (
					imageTag()
				)}
			</div>
		</section>
	);
}
