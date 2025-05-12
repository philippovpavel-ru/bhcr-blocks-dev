import {
	useBlockProps,
	useInnerBlocksProps
} from '@wordpress/block-editor';

export default function Edit() {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: "container", style: {width: "100%"} },
		{
			allowedBlocks: ['core/heading', 'core/paragraph', 'core/image', 'core/list', 'core/video'],
			template: [
				['core/paragraph', {
					content: "Пептиды появились в космецевтической области в 1973 году, когда Лорен Пикарт предложил синтетический пептид, который усиливал выработку коллагена. Позже их стали использовать и в косметологии. Так что пептидов было разработано великое множество под различные запросы рынка. Но давайте же с начала разберемся в том, что такое пептиды?"
				}],
				['core/heading', {
					level: 3,
					content: "Сейчас в производстве косметических средств используются четыре вида пептидов"
				}],
				
				['core/heading', {
					level: 2,
					content: "Средства, содержащие в себе несколько типов пептидов — наиболее эффективны!"
				}],
				['core/paragraph', {
					content: "ВАЖНО! К сожалению, если вы собираетесь использовать средства с пептидами на постоянной основе, то придется отказаться от средств, содержащих кислоты, витамин С и ретинол. Вреда для кожи не будет, но и положительного эффекта вы тоже не добьетесь, так как эти вещества нейтрализуют действие друг друга."
				}],
			]
		}
	);

	return (
		<article {...useBlockProps({ className: "sd-article" })}>
			<div {...innerBlocksProps} />
		</article>
	);
}
