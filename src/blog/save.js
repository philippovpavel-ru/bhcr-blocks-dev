import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { title } = attributes;

	return (
		<section {...useBlockProps.save({ className: 'sd-blog' })}>
			<div className="container">
				{title && (
					<RichText.Content
						tagName="h2"
						value={title}
					/>
				)}

				<div className="sd-blog__grid">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
