import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { title, description, link } = attributes;

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "swiper-wrapper" },
		{
			allowedBlocks: ['snd/ingredient-card'],
			orientation: "horizontal",
			template: [
				['snd/ingredient-card'],
				['snd/ingredient-card'],
				['snd/ingredient-card'],
				['snd/ingredient-card'],
				['snd/ingredient-card']
			]
		}
	);

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const style = '.swiper-slide.sd-ingredients__card {min-width: unset !important;}';

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

			<style>{style}</style>

			<section {...useBlockProps({ className: 'sd-best sd-ingredients' })}>
				<div className="container">
					<div className="sd-best__header">
						<RichText
							tagName="h2"
							placeholder="Title"
							value={title || ''}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>

						{(link.show) && (
							<RichText
								tagName="a"
								href='#'
								placeholder="Link Title"
								style={!link.url ? { opacity: ".5" } : {}}
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
								placeholder="Description"
								value={description || ''}
								onChange={(value) =>
									onChangeText('description', value)
								}
							/>
						</div>
						<div className="swiper swiper-best">
							<div {...innerBlocksProps} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
