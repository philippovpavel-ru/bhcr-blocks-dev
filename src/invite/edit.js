import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, description_01, description_02 } = attributes;
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "sd-invite__slider-inner", style: {width: "100%"} },
		{
			allowedBlocks: ['snd/invite-card'],
			orientation: "horizontal",
			template: [
				['snd/invite-card']
			],
			templateLock: "all"
		}
	);

	return (
		<>
			<section {...useBlockProps({ className: 'sd-invite' })}>
				<div className="container">
					<RichText
						tagName="h2"
						placeholder="Title"
						value={title || ''}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>
					<div className="sd-invite__text">
						<RichText
							tagName="h3"
							placeholder="Subitle"
							value={subtitle || ''}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>
						<RichText
							tagName="p"
							placeholder="Description - 01 column"
							value={description_01 || ''}
							onChange={(value) =>
								onChangeText('description_01', value)
							}
						/>
						<RichText
							tagName="p"
							placeholder="Description - 02 column"
							value={description_02 || ''}
							onChange={(value) =>
								onChangeText('description_02', value)
							}
						/>
					</div>
					<div {...innerBlocksProps} />
				</div>
			</section>
		</>
	);
}
