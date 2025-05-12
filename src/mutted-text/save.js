import { useBlockProps, RichText } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const { description } = attributes;
	return (
		<section {...useBlockProps.save()}>
			{description && (
				<RichText.Content
					tagName="span"
					value={description}
				/>
			)
			}
		</section>
	);
}
