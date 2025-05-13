import {
	useBlockProps,
	RichText,
	useInnerBlocksProps
} from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	const { title, description } = attributes;

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ style: { width: "100%" } },
		{
			allowedBlocks: ['contact-form-7/contact-form-selector'],
			template: [['contact-form-7/contact-form-selector']],
			templateLock: "all"
		}
	);

	return (
		<>
			<section {...useBlockProps({ className: 'sd-form' })}>
				<div className="container">
					<RichText
						tagName="h2"
						placeholder="Title"
						value={title || ''}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>

					<RichText
						tagName="h3"
						placeholder="Description"
						value={description || ''}
						onChange={(value) =>
							onChangeText('description', value)
						}
					/>

					<div {...innerBlocksProps} />
				</div>
			</section>
		</>
	);
}
