import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

export default function Edit() {


	return (
		<>
			<hr style={{margin: "10px auto", borderStyle: "dashed", borderWidth: "5px"}} />

			<div {...useBlockProps({ className: 'sd-paralax-wrapper' })}>
				<InnerBlocks />
			</div>

			<hr style={{ margin: "10px auto", borderStyle: "dashed", borderWidth: "5px" }} />
		</>
	);
}
