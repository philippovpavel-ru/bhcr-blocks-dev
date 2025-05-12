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

export default function Edit({ attributes, setAttributes }) {
	const { title, description, link } = attributes;
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
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

			<section {...useBlockProps({ className: 'sd-you' })}>
				<div className="container">
					<div className="sd-best__header">
						<RichText
							tagName="h2"
							value={title || ''}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>

						{(link.show) && (
							<RichText
								tagName="a"
								href="#"
								target={link.target ? '_blank' : '_self'}
								value={link.title || ''}
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
								onChange={(value) =>
									onChangeText('description', value)
								}
							/>
						</div>

						<div className="swiper swiper-best">
							<div className="swiper-wrapper">
								<InnerBlocks
									allowedBlocks={['snd/you-product-card']}
									orientation="horizontal"
									template={[
										['snd/you-product-card'],
										['snd/you-product-card'],
										['snd/you-product-card'],
										['snd/you-product-card']
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
