import { useBlockProps, RichText } from '@wordpress/block-editor';
import placeholderImage from './steps.jpeg';

export default function save({ attributes }) {
	const { instanceId, title, description, instruction, link, image, steps } = attributes;
	const stepsStyles = steps?.map((step, index) => {
		let styles = `.sd-steps--${instanceId} .sd-steps__number--${index} { top: ${step.position.desktop.top}%; right: ${step.position.desktop.right}%; }`;

		if (step.position.tablet?.active) {
			styles += `@media(max-width: ${step.position.tablet.width}px) {.sd-steps--${instanceId} .sd-steps__number--${index} {top: ${step.position.tablet.top}%; right: ${step.position.tablet.right}%;}}`;
		}

		if (step.position.mobile?.active) {
			styles += `@media(max-width: ${step.position.mobile.width}px) {.sd-steps--${instanceId} .sd-steps__number--${index} {top: ${step.position.mobile.top}%;right: ${step.position.mobile.right}%;}}`;
		}

		return styles;
	}).join("\n");

	return (
		<>
			{ steps && (
				<style>{stepsStyles}</style>
			)}

			<section {...useBlockProps.save({ className: `sd-steps sd-steps--${instanceId}` })}>
				<div className="container">
					<div className="sd-steps__img-box">
						{instruction && (
							<RichText.Content
								tagName="p"
								className="sd-steps__img-text"
								value={instruction}
							/>
						)}

						{image.url ? (
							<img src={image.url} alt={image.alt} loading="lazy" />
						) : (
							<img src={placeholderImage} alt="" />
						)}

						{steps && (
							<div className="sd-steps__numbers">
								{steps.map((step, index) => (
									<p key={index} className={`sd-steps__number sd-steps__number--${index}`} title={step.title}>
										{index + 1}
									</p>
								))}
							</div>
						)}
					</div>

					<div className="sd-steps__text-box">
						{title && (
							<RichText.Content
								tagName="h2"
								value={title}
							/>
						)}

						{description && (
							<RichText.Content
								tagName="h3"
								value={description}
							/>
						)}

						{(link.show && link.url) && (
							<RichText.Content
								tagName="a"
								href={link.url}
								target={link.target ? '_blank' : '_self'}
								value={link.title + ' →'}
							/>
						)}

						{steps && (
							<div className="sd-steps__tabs">
								{steps.map((step, index) => (
									<div className={"sd-steps__tab" + (index === 0 ? ' active' : '')}>
										<p>{index + 1}. {step.title}</p>
										{step.description && (<p>{step.description}</p>)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
