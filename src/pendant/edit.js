import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextareaControl,
	Button
} from '@wordpress/components';
import placeholderImage from './pendant.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { title, description, image } = attributes;
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">

					<TextareaControl
						label="Subtitle Mobile"
						value={description}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('description', value)
						}
					/>
					<hr />
					<h2>Image</h2>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								const url = media?.sizes?.large?.url || media?.url || '';
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

			<section {...useBlockProps({ className: 'sd-pendant' })}>
				<div className="container">
					<RichText
						tagName="h2"
						value={title || ''}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>
					<RichText
						tagName="h3"
						value={description || ''}
						onChange={(value) =>
							onChangeText('description', value)
						}
					/>
					<div className="sd-pendant__img-box">
						<img src={image?.url || placeholderImage} alt={image?.alt || ''} style={!image?.url ? { opacity: ".5" } : {}} />
						<div className="sd-contacts__bottom-hr wow animated"></div>
						<div className="sd-contacts__bottom-hr wow animated"></div>
					</div>
				</div>
			</section>
		</>
	);
}
