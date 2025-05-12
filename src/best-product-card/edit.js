import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	ComboboxControl,
	Notice
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import placeholderImage from './c3.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { product } = attributes;

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
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: 'swiper-slide' })}>
				{(product?.id) ? (
					<div className="sd-best__card">
						<div className="sd-best__img-box">
							<a href="#" className="sd-best__img-link">
								{product?.image_url ? (
									<img src={product.image_url} />
								) : (
									<img src={placeholderImage} style={{ opacity: ".5" }} />
								)}
							</a>
						</div>
						<a href="#" className="sd-best__card-name">
							{product?.title || 'No name'}
						</a>
					</div>
				) : (
					<img src={placeholderImage} style={{ opacity: ".5" }} />
				)}
			</div>
		</>
	);
}
