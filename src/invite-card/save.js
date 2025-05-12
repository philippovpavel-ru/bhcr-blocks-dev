import { useBlockProps } from '@wordpress/block-editor';
import placeholderImage from './i1.jpeg';

export default function save({ attributes }) {
	const { images } = attributes;
	return (
		<div {...useBlockProps.save({ className: 'sd-invite__slider' })}>
			{images && (
				<>
					<div className="sd-invite__buttons">
						<div className="swiper-button-prev swiper-button-prev-invite">
						</div>
						<div className="swiper-button-next swiper-button-next-invite">
						</div>
					</div>

					<div className="swiper swiper-invite">
						<div className="swiper-wrapper">
							{images?.map((image, index) => (
								<div key={index} className="swiper-slide">
									<img src={image?.url || placeholderImage} alt={image?.alt || ''} />
									{image?.title && (
										<p>{image.title}</p>
									)}
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
