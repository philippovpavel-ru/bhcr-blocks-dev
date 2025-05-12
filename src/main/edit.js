import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	RichText,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import placeholderImage from './404.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { mobHeader, mirror, type, title, image } = attributes;

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'sd-main-inner-content', style: {width: "100%"} },
		{
			allowedBlocks: ['snd/main-button-link', 'snd/main-contact-info', 'snd/main-text', 'snd/main-text-bold'],
			template: [
				['snd/main-button-link', {
					url: "#",
					title: "Зарегистрироваться",
					target: false
				}]
			]
		}
	);

	const imageTag = () => (
		<div className="sd-404__img">
			<img
				src={image?.url || placeholderImage}
				alt={image?.alt || ''}
				style={!image?.url ? { opacity: ".5" } : {}}
			/>
		</div>
	);

	const addTypeClassWrapper = () => {
		if (type === "privileges") {
			return "sd-vacancies sd-privileges";
		} else if (type === "vacancies") {
			return "sd-vacancies";
		} else {
			return "sd-default";
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						value={type}
						label="Type"
						onChange={(value) => setAttributes({ type: value })}
						options={[
							{
								disabled: true,
								label: 'Select a Type',
								value: ''
							},
							{
								label: 'Default',
								value: 'default'
							},
							{
								label: 'Privileges',
								value: 'privileges'
							},
							{
								label: 'Vacancies',
								value: 'vacancies'
							}
						]}
					/>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Mobile Header"
						checked={mobHeader}
						onChange={() => setAttributes({ mobHeader: !mobHeader })}
					/>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Swap"
						checked={mirror}
						onChange={() => setAttributes({ mirror: !mirror })}
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
				</PanelBody>
			</InspectorControls>

			<main {...useBlockProps({ className: `sd-contacts ${addTypeClassWrapper()}` })}>
				{mobHeader && (
					<div className="container sd-contacts__mob-header">
						<div className="sd-bread-crumbs">
							<a href="#">Hone</a>
							<span>/</span>
							<p>Title Page</p>
						</div>

						<RichText
							tagName='h1'
							value={title || ''}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>
					</div>
				)}

				<div className="container sd-contacts__grid">
					{!mirror && (
						<>
							{imageTag()}
							<div className="sd-404__hr"></div>
						</>
					)}

					<div className="sd-contacts__text">
						<div className="sd-bread-crumbs">
							<a href="#">Hone</a>
							<span>/</span>
							<p>Title Page</p>
						</div>

						<RichText
							tagName='h1'
							value={title || ''}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>

						<div {...innerBlocksProps} />
					</div>

					{mirror && (
						<>
							<div className="sd-404__hr"></div>
							{imageTag()}
						</>
					)}

					<div className="sd-contacts__bottom-hr"></div>
				</div>
			</main>
		</>
	);
}
