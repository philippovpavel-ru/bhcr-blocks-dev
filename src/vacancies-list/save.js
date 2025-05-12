import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { type, title, listBoxTitle, listBoxSubtitle, vacancies } = attributes;

	return (
		<section {...useBlockProps.save({ className: `sd-vacancies-list sd-vacancies-list_${type}` })}>
			<div className="container">
				<RichText.Content
					tagName="h2"
					value={title || ''}
				/>

				<div className="sd-vacancies-list__box">
					{type === 'club' && (
						<RichText.Content
							tagName="h4"
							value={listBoxSubtitle || ''}
						/>
					)}

					<RichText.Content
						tagName="h3"
						value={listBoxTitle || ''}
					/>

					{vacancies && (
						<div className="sd-vacancies-list__rows">
							{vacancies?.map((item, index) => (
								<a
									key={index}
									href={item?.url || '#'}
									target={item?.target ? '_target' : '_self'}
									className="sd-vacancies-list__row"
								>
									<RichText.Content
										tagName={type === "default" ? "h4" : "p"}
										value={item?.title || ''}
									/>

									{type === "default" && (
										<RichText.Content
											tagName="p"
											value={item?.description || ''}
										/>
									)}
									<span></span>
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
