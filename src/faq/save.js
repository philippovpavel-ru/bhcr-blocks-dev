import { useBlockProps } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const { faq_block } = attributes;
	return (
		<div {...useBlockProps.save({ className: 'sd-question__details' })}>
			<div className="sd-question__details">
					<>
						{faq_block.map((faq_item, index) => (
							<div key={index} className="b-protocol__details">
								{faq_item?.title && (
									<h4 className="b-protocol__details-button">{faq_item.title}</h4>
								)}
								{faq_item?.description && (
									<>
										<div className="b-protocol__details-box">
											<p>{faq_item.description}</p>
										</div>
									</>
								)}
							</div>
						))}
					</>
			</div>
		</div>
	);
}
