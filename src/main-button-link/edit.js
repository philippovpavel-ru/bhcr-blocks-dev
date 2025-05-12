import {
	useBlockProps,
	RichText,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { link } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
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
						value={ link.url }
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

			<RichText
				tagName="div"
				{...useBlockProps({
					className: 'sd-404__link',
				})}
				value={link.title || ''}
				onChange={(value) => setAttributes({
					link: { ...link, title: value },
				})}
			/>
		</>
	);
}
