import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import placeholderImage from './love.jpeg';

export default function Edit( { attributes, setAttributes } ) {
	const { type, mirror, image } = attributes;
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'sd-love__text-box' }, // props для обертки
		{
			allowedBlocks: ['core/heading', 'core/paragraph', 'snd/love-link-block', 'snd/love-product-card'],
			template: [
				['core/heading', {
					level: 2,
					content: 'Love the sun? Love your skin with LightAIR VEGGIE'
				}],
				['core/paragraph', {
					className: 'sd-love__text',
					content: 'Новый солнцезащитный крем двойного действия: надежно защищает кожу от ультрафиолета с SPF 50+ PA++++, при этом эффективно питает ее'
				}],
			],
		}
	);

	const ImageTag = () => (
		<img
			className="sd-love__img"
			src={image?.url || placeholderImage}
			alt={image?.alt || ''}
			loading="lazy"
			style={{ height: "100%", opacity: !image?.url ? ".5" : "" }}
		/>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						value={type}
						label="Type"
						onChange={(value) => setAttributes({type: value})}
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
								label: 'Treat',
								value: 'treat'
							}
						]}
					/>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Swap"
						checked={mirror}
						onChange={() => setAttributes({mirror: !mirror})}
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
												isDestructive={ true }
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

			<section {...useBlockProps({ className: `sd-love sd-${type}` })}>
				<div className="container">
					{mirror && (
						ImageTag()
					)}

					<div {...innerBlocksProps} />

					{!mirror && (
						ImageTag()
					)}
				</div>
			</section>
		</>
	);
}
