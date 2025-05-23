import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<div {...useBlockProps.save({ className: 'sd-paralax-wrapper' })}>
			<InnerBlocks.Content />
		</div>
	);
}
