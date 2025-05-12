import {
	RichText,
	useBlockProps
} from '@wordpress/block-editor';
import { Notice } from '@wordpress/components';
import mapImage from './map.jpg';

export default function Edit({attributes, setAttributes}) {
	const { title } = attributes;

	return (
		<section {...useBlockProps({ className: "b-map" })}>
			<div className="container">
				<div class="sd-bread-crumbs">
					<a href="#">Frontpage</a>
					<span>/</span>
					<p>Title</p>
				</div>

				<RichText
					tagName='h1'
					value={title || ''}
					onChange={(value) => setAttributes({title: value})}
				/>

				<Notice isDismissible={false} status="warning">
					Map data is edited on a separate page of the "Partners" entry type.
				</Notice>
				<img
					src={mapImage}
					className="b-map__flex b-map__image-placeholder"
					style={{
						width: "100%",
						opacity: ".5"
					}}
				/>
			</div>
		</section>
	);
}
