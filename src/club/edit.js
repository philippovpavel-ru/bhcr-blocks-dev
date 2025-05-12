import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import placeholderImage from './club.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { title, description, link, image } = attributes;
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
							allowedTypes={['image']}
							value={image.id}
							render={({ open }) => (
								<>
									{image.url && (
										<img src={image.url} />
									)}

									<div style={{ display: 'flex', gap: '10px' }}>
										<Button
											size={image.url ? 'small' : "default"}
											variant={image.url ? 'secondary' : "primary"}
											onClick={open}
										>
											{image.url ? 'Change' : 'Select'} image
										</Button>

										{image.url && (
											<Button
												size='small'
												isDestructive={true}
												variant='secondary'
												onClick={() => {
													setAttributes({
														image: {
															id: 0,
															url: '',
															alt: '',
														},
													});
												}}
											> x </Button>
										)}
									</div>
								</>
							)}
						/>
					</MediaUploadCheck>

					<br /><hr />

					<h2>Link</h2>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Show link"
						checked={link.show}
						onChange={() => setAttributes({
							link: { ...link, show: !link.show },
						})}
					/>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Open new tab"
						checked={link.target}
						onChange={() => setAttributes({
							link: { ...link, target: !link.target },
						})}
					/>
					<TextControl
						__nextHasNoMarginBottom={true}
						type="url"
						label="Link URL"
						value={link.url}
						onChange={(value) => setAttributes({
							link: { ...link, url: value },
						})}
					/>
					<TextControl
						__nextHasNoMarginBottom={true}
						label="Link Title"
						value={link.title}
						onChange={(value) => setAttributes({
							link: { ...link, title: value },
						})}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-club' })}>
				{image.url ? (
					<img src={image.url} alt={image.alt} loading="lazy" />
				) : (
					<img src={placeholderImage} style={{ opacity: ".5" }} />
				)}

				<div className="container">
					<RichText
						tagName="h2"
						value={title || ''}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>

					<RichText
						tagName="p"
						value={description || ''}
						onChange={(value) =>
							onChangeText('description', value)
						}
					/>

					{(link.show) && (
						<RichText
							tagName="a"
							href='#'
							target={link.target ? '_blank' : '_self'}
							className="sd-club__link"
							value={link.title || ''}
							onChange={(value) => setAttributes({
								link: { ...link, title: value },
							})}
						/>
					)}
				</div>
			</section>
		</>
	);
}
