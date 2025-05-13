import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	TextareaControl
} from '@wordpress/components';
import placeholderImage from './in1.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { image, title, description } = attributes;

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
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
					<hr />
					<TextControl
						label="Title"
						value={title}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>
					<TextareaControl
						label="Description"
						value={description}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('description', value)
						}
					/>
				</PanelBody>
			</InspectorControls>


			<div {...useBlockProps({ className: 'swiper-slide sd-ingredients__card' })}>
				<img src={image?.url || placeholderImage} style={!image?.url ? { opacity: ".5" } : {}} />

				<div className="sd-ingredients__card-text">
					<RichText
						tagName="h4"
						placeholder="Title"
						value={title || ''}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>
					<a></a>
					<RichText
						tagName="p"
						placeholder="Description"
						value={description || ''}
						onChange={(value) =>
							onChangeText('description', value)
						}
					/>
				</div>
			</div>
		</>
	);
}