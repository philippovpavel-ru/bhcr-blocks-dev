import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './m1.svg';

export default function save({ attributes }) {
	const { title, images } = attributes;
	return (
		<div {...useBlockProps.save({ className: 'sd-market' })}>
			<div className="container">
				<RichText.Content
					tagName="h2"
					value={title || ''}
				/>

				<div className="sd-market__grid">
					{(images && images.length > 0) ? (
						images.map((image, index) => (
							<a
								key={index}
								href={image.link.url}
								target={image.link.target ? '_blank' : '_self'}
								title={image.link.title}
							>
								<img src={image.img?.url || placeholderImage} alt={image.img?.alt || ''} />
							</a>
						))
					) : (
						<>
							<img src={placeholderImage} style={{ opacity: ".5" }} />
							<img src={placeholderImage} style={{ opacity: ".5" }} />
							<img src={placeholderImage} style={{ opacity: ".5" }} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
