import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { faq_block } = attributes;
	return (
		<div {...useBlockProps.save({ className: 'sd-question__details' })}>
			<div className="sd-question__details">
				<>
					{faq_block.map((faq_item, index) => (
						<div key={index} className="b-protocol__details">
							{faq_item?.title && (
								<RichText.Content
									tagName='h4'
									className="b-protocol__details-button"
									value={faq_item.title}
								/>
							)}
							{faq_item?.description && (
								<div className="b-protocol__details-box">
									<RichText.Content
										tagName='p'
										value={faq_item.description}
									/>
								</div>
							)}
						</div>
					))}
				</>
			</div>
		</div>
	);
}
