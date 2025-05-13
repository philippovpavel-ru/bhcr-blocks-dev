import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Button
} from '@wordpress/components';
import placeholderImage from './t2.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { title, description, subtitle, text_technologies, image, mirror } = attributes;

	const innerBlocksProps = useInnerBlocksProps(
		{ style: { marginTop: "auto" } },
		{
			allowedBlocks: ['snd/technology-img'],
			templateLock: "all",
			orientation: "horizontal",
			template: [
				['snd/technology-img']
			]
		}
	);

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const imageTag = () => (
		<img
			src={image?.url || placeholderImage}
			className="sd-technologies__img"
			style={{ height: "inherit", opacity: !image?.url ? ".5" : "" }}
		/>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Swap"
						checked={mirror}
						onChange={() => setAttributes({
							mirror: !mirror,
						})}
					/>
					<hr />

					<h2>Image</h2>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								const url = media?.sizes?.full?.url || media?.url || '';
								setAttributes({
									image: {
										id: media?.id || 0,
										url: url,
										alt: media?.alt || '',
									},
								});
							}}
							allowedTypes={'image'}
							value={image.id}
							render={({ open }) => (
								<>
									{image.url && (
										<img src={image.url} />
									)}

									<div style={{ "display": 'flex', "gap": '15px' }}>
										<Button
											size={image.url ? 'small' : "default"}
											variant={image.url ? 'secondary' : "primary"}
											onClick={open}>
											{image.url ? 'Change' : "Select"} image
										</Button>

										{image.url && (
											<Button
												size='small'
												variant='secondary'
												isDestructive={true}
												onClick={() => {
													setAttributes({
														image: {
															id: 0,
															url: '',
															alt: '',
														},
													});
												}}
											> X </Button>
										)}
									</div>


								</>
							)}
						/>
					</MediaUploadCheck>

				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-technologies' })}>
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
				<div className="sd-technologies__grid">
					{mirror && (
						imageTag()
					)}

					<div className="sd-technologies__text">
						<RichText
							tagName="h4"
							placeholder="Subtitle"
							value={subtitle || ''}
							onChange={(value) =>
								onChangeText('subtitle', value)
							}
						/>

						<RichText
							tagName="p"
							placeholder="Text"
							value={text_technologies || ''}
							onChange={(value) =>
								onChangeText('text_technologies', value)
							}
						/>

						<div {...innerBlocksProps} />
					</div>

					{!mirror && (
						imageTag()
					)}
				</div>
			</section>

		</>
	);
}
