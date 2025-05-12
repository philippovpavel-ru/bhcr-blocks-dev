import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {title, description, link } = attributes;
	return (
		<section {...useBlockProps.save({ className: 'sd-best sd-ingredients' } ) }>
			<div className="container">
				<div className="sd-best__header">
					{title && (
						<>
							<RichText.Content
								tagName="h2"
								value={title}
							/>
						</>
					)}

					{(link.show && link.url) && (
						<RichText.Content
							tagName="a"
							href={link.url}
							target={link.target ? '_blank' : '_self'}
							value={link.title + ' →'}
						/>
					)}
				</div>
				<div className="sd-best__slider">
					<div className="sd-best__slider-header">
						{description && (
							<RichText.Content
								tagName="h3"
								value={description}
							/>
						)}
						<div className="sd-best__slider-buttons">
							<div className="swiper-button-prev-best"></div>
							<div className="swiper-button-next-best"></div>
						</div>
					</div>
					<div className="swiper swiper-best">
						<div className="swiper-wrapper">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
