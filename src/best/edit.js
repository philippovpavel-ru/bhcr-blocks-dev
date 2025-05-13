import {
	useBlockProps,
	RichText,
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { hideCount, isProduct, count, title, description, link } = attributes;
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	// Получаем количество вложенных блоков
	const innerBlocksCount = useSelect(
		(select) => select(blockEditorStore).getBlockOrder(clientId).length,
		[clientId]
	);

	// Обновляем атрибут, если количество изменилось
	useEffect(() => {
		if (count !== innerBlocksCount) {
			setAttributes({ count: innerBlocksCount });
		}
	}, [innerBlocksCount]);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label={"Hide Count"}
						checked={hideCount}
						help={!hideCount ? `Show (${count})` : 'Hide'}
						onChange={() => setAttributes({
							hideCount: !hideCount,
						})}
					/>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="This is Product Card"
						checked={isProduct}
						onChange={() => setAttributes({
							isProduct: !isProduct,
						})}
					/>
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

			<section {...useBlockProps({ className: `sd-best ${isProduct ? 'sd-complite-slider' : ''}` })}>
				<div className="container">
					<div className="sd-best__header">
						<RichText
							tagName="h2"
							value={title || ''}
							placeholder="Title"
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>

						{(link.show) && (
							<RichText
								tagName="a"
								href='#'
								target={link.target ? '_blank' : '_self'}
								value={link.title || ''}
								placeholder="Link Title"
								style={!link.url ? {opacity: ".5"} : {}}
								onChange={(value) => setAttributes({
									link: { ...link, title: value },
								})}
							/>
						)}
					</div>

					<div className="sd-best__slider">
						<div className="sd-best__slider-header">
							<RichText
								tagName="h3"
								value={description || ''}
								placeholder="Description"
								onChange={(value) =>
									onChangeText('description', value)
								}
							/>
						</div>

						<div className="swiper swiper-best">
							<div className="swiper-wrapper">
								<InnerBlocks
									allowedBlocks={['snd/best-product-card']}
									orientation="horizontal"
									template={[
										['snd/best-product-card'],
										['snd/best-product-card'],
										['snd/best-product-card'],
										['snd/best-product-card']
									]}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
