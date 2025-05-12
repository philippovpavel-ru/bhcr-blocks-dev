import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { title, subtitle, description_01, description_02 } = attributes;
	return (
		<section {...useBlockProps.save({ className: 'sd-invite' })}>
			<div className="container">
				{title && (
					<RichText.Content
						tagName="h2"
						value={title}
					/>
				)}
				<div className="sd-invite__text">
					{subtitle && (
						<RichText.Content
							tagName="h3"
							value={subtitle}
						/>
					)}
					{description_01 && (
						<RichText.Content
							tagName="p"
							value={description_01}
						/>
					)}
					{description_02 && (
						<RichText.Content
							tagName="p"
							value={description_02}
						/>
					)}
				</div>

				<InnerBlocks.Content />
			</div>
		</section>
	);
}
