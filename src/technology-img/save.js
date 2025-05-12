import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './t2.jpeg';

export default function save({ attributes }) {
	const { images } = attributes;
	return (
		<div {...useBlockProps.save({ className: 'sd-technologies__imgs' })}>
			{images ? (
				images.map((image, index) => (
					<img key={index} src={image?.url || placeholderImage} alt={image?.alt || ''} />
				))
			) : (
				<>
					<img src={placeholderImage} alt="" />
					<img src={placeholderImage} alt="" />
					<img src={placeholderImage} alt="" />
				</>
			)}
		</div>
	);
}
