import {
	useBlockProps,
	RichText,
	InnerBlocks
} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title } = attributes;
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	return (
		<>
			<section {...useBlockProps({ className: 'sd-blog' })}>
				<div className="container">
					<RichText
						tagName="h2"
						value={title || ''}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>

					<div className="sd-blog__grid sd-blog__grid--inner">
						<InnerBlocks
							allowedBlocks={['snd/blog-card']}
							orientation="horizontal"
							template={[
								['snd/blog-card'],
								['snd/blog-card',
									{
										title: 'ПОДАРОЧНЫЙ СЕРТИФИКАТ',
										description: 'Электронная подарочная карта Bohicare создана, чтобы дарить любовь и заботу близким. Где бы они не находились',
										link: {
											"show": true,
											"title": "Сделать подарок",
											"url": "",
											"target": false
										}
									}
								],
								['snd/blog-card',
									{
										title: 'ПОКУПАЙТЕ ДОЛЯМИ',
										description: 'Блок под небольшое текстовое описание что ждёт читателей внутри страницы. Блок под небольшое текстовое описание что ждёт читателей внутри страницы.',
										link: {
											"show": true,
											"title": "Узнать условия",
											"url": "",
											"target": false
										}
									}
								]
							]}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
