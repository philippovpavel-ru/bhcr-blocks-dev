import {
	useBlockProps,
	useInnerBlocksProps
} from '@wordpress/block-editor';


export default function Edit() {
	const innerBlocksProps = useInnerBlocksProps(
		{ ...useBlockProps({ className: 'sd-support__text' }), style: {minWidth: "unset !important"} },
		{
			allowedBlocks: ['core/heading', 'core/paragraph', 'core/list', 'snd/faq'],
			orientation: "horizontal",
			template: [
				['core/heading', {
					level: 2,
					content: 'Оплата заказа на сайте'
				}],
				['core/paragraph', {
					content: 'Оплата осуществляется онлайн сразу после оформления заказа.'
				}],
				['snd/mutted-text']
			]
		}
	);

	return (
		<>
			<div {...innerBlocksProps} />
		</>
	);
}
