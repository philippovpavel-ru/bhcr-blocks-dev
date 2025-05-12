import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


export default function save( { attributes } ) {
	return (
		<div {...useBlockProps.save({ className: 'sd-support__text' } ) }>
			<InnerBlocks.Content />
		</div>
	);
}
