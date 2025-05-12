import {
	useBlockProps,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ComboboxControl,
	TextControl,
	ToggleControl,
	Button,
	Notice
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import placeholderImage from './c3.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { product, link, image } = attributes;

	// внутри product {id: 1, title: "Название", "image_url": ""}

	const products = useSelect((select) => {
		const { getEntityRecords } = select('core');
		return getEntityRecords('postType', 'product', {
			per_page: -1,
			status: 'publish',
			_embed: true
		});
	});

	const productOptions = useMemo(() => {
		return (products || []).map((p) => ({
			label: p.title.rendered,
			value: String(p.id),
			image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
			title: p.title.rendered,
		}));
	}, [products]);

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

					<hr />
					{products ? (
						<ComboboxControl
							label="Select product"
							options={productOptions}
							value={product?.id ? String(product.id) : ''}
							onChange={(selectedId) => {
								const selected = productOptions.find((p) => p.value === selectedId);
								if (selected) {
									setAttributes({
										product: {
											id: parseInt(selected.value),
											title: selected.title,
											image_url: selected.image
										}
									});
								}
							}}
						/>
					) : (
						<Notice
							isDismissible={false}
							status="warning"
						>
							Install WooCommerce or add products to the database
						</Notice>
					)}

					<hr />

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

			<div {...useBlockProps({ className: 'swiper-slide' })}>
				{(product?.id) ? (
					<div className="sd-you__card sd-best__card">
						<div className="sd-best__img-box">
							<a href="#" className="sd-best__img-link">
								<img
									src={image?.url || product?.image_url || placeholderImage}
									style={(!image?.url || !product?.image_url) ? { opacity: ".5" } : {}}
								/>
							</a>
						</div>

						{link?.show ? (
							<a href="#" className="sd-best__card-name">
								{link?.title || product?.title || 'No name'}
							</a>
						) : (
							<a href="#" className="sd-best__card-name">
								{product?.title || 'No name'}
							</a>
						)}

					</div>
				) : (
					<img src={placeholderImage} style={{ opacity: ".5" }} />
				)}
			</div>
		</>
	);
}
