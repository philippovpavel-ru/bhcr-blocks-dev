import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	RangeControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import placeholderImage from './steps.jpeg';
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { instanceId, title, description, instruction, link, image, steps } = attributes;
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const onChangeRepeaterItem = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(steps));
		updatedArray[index][field] = value;
		setAttributes({ steps: updatedArray });
	};

	const updateStepPosition = (index, device, side, value) => {
		const newSteps = [...attributes.steps];

		newSteps[index] = {
			...newSteps[index],
			position: {
				...newSteps[index].position,
				[device]: {
					...newSteps[index].position[device],
					[side]: value,
				},
			},
		};

		setAttributes({ steps: newSteps });
	};

	const onClickAddRepeaterItem = () => {
		const newItem = {
			title: "Название",
			description: "Описание",
			position: {
				desktop: {
					top: 50,
					right: 50
				},
				tablet: {
					active: false,
					width: 767,
					top: 50,
					right: 50
				},
				mobile: {
					active: false,
					width: 374,
					top: 50,
					right: 50
				}
			}
		};

		const updatedArray = JSON.parse(JSON.stringify(steps));
		updatedArray.push(newItem);
		setAttributes({ steps: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(steps);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ steps: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(steps));
		updatedArray.splice(index, 1);
		setAttributes({ steps: updatedArray });
	};

	useEffect(() => {
		if (!instanceId) {
			setAttributes({ instanceId: clientId });
		}
	}, [clientId]);

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
			<InspectorControls>
				<PanelBody title="Settings">
					<h2>Image</h2>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								const url = media?.sizes?.full?.url || media?.url || '';
								setAttributes({
									image: {
										id: media?.id || 0,
										url: url,
										alt: media?.alt || '',
									},
								});
							}}
							allowedTypes={['image']}
							value={image.id}
							render={({ open }) => (
								<>
									{image.url && (
										<img src={image.url} />
									)}

									<div style={{ display: 'flex', gap: '10px' }}>
										<Button
											size={image.url ? 'small' : "default"}
											variant={image.url ? 'secondary' : "primary"}
											onClick={open}
										>
											{image.url ? 'Change' : 'Select'} image
										</Button>

										{image.url && (
											<Button
												size='small'
												isDestructive={true}
												variant='secondary'
												onClick={() => {
													setAttributes({
														image: {
															id: 0,
															url: '',
															alt: '',
														},
													});
												}}
											> x </Button>
										)}
									</div>
								</>
							)}
						/>
					</MediaUploadCheck>

					<br /><hr />

					<h2>Link</h2>

					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Show link"
						checked={link.show}
						onChange={() => setAttributes({
							link: { ...link, show: !link.show },
						})}
					/>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Open new tab"
						checked={link.target}
						onChange={() => setAttributes({
							link: { ...link, target: !link.target },
						})}
					/>
					<TextControl
						__nextHasNoMarginBottom={true}
						type="url"
						label="Link URL"
						value={link.url}
						onChange={(value) => setAttributes({
							link: { ...link, url: value },
						})}
					/>
					<TextControl
						__nextHasNoMarginBottom={true}
						label="Link Title"
						value={link.title}
						onChange={(value) => setAttributes({
							link: { ...link, title: value },
						})}
					/>
				</PanelBody>

				<PanelBody title="List">
					<DragDropContext onDragEnd={onDragEndRepeaterItem}>
						<Droppable droppableId="array-list-droppable">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="array-list-droppable"
								>
									{steps?.map((item, index) => (
										<Draggable
											key={index}
											draggableId={`item-${index}`}
											index={index}
										>
											{(provided) => (
												<details
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<summary>
														<span>= Item {index + 1}</span>
														<Button
															size="small"
															variant="secondary"
															isDestructive={true}
															title="Remove item"
															onClick={() => onRemoveRepeaterItem(index)}
														>x</Button>
													</summary>

													<div>
														<TextControl
															label="Title"
															value={item.title}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'title'
															)}
															__nextHasNoMarginBottom={true}
														/>

														<TextControl
															label="Description"
															value={item.description}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'description'
															)}
															__nextHasNoMarginBottom={true}
														/>

														<hr />

														<h2>Desktop</h2>
														<RangeControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom
															initialPosition={item.position.desktop.top}
															label="Top"
															max={100}
															min={0}
															onChange={(value) => updateStepPosition(index, 'desktop', 'top', Number(value))}
														/>
														<RangeControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom
															initialPosition={item.position.desktop.right}
															label="Right"
															max={100}
															min={0}
															onChange={(value) => updateStepPosition(index, 'desktop', 'right', Number(value))}
														/>

														<hr />

														<h2>Tablet</h2>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Change"
															checked={item.position.tablet.active}
															onChange={() => updateStepPosition(index, 'tablet', 'active', !item.position.tablet.active)}
														/>

														<TextControl
															label="Max Width"
															type="number"
															value={item.position.tablet.width}
															onChange={(value) => updateStepPosition(index, 'tablet', 'width', Number(value))}
															__nextHasNoMarginBottom={true}
														/>

														<RangeControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom
															initialPosition={item.position.tablet.top}
															label="Top"
															max={100}
															min={0}
															onChange={(value) => updateStepPosition(index, 'tablet', 'top', Number(value))}
														/>
														<RangeControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom
															initialPosition={item.position.tablet.right}
															label="Right"
															max={100}
															min={0}
															onChange={(value) => updateStepPosition(index, 'tablet', 'right', Number(value))}
														/>

														<hr />

														<h2>Mobile</h2>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Change"
															checked={item.position.mobile.active}
															onChange={() => updateStepPosition(index, 'mobile', 'active', !item.position.mobile.active)}
														/>

														<TextControl
															label="Max Width"
															type="number"
															value={item.position.mobile.width}
															onChange={(value) => updateStepPosition(index, 'mobile', 'width', Number(value))}
															__nextHasNoMarginBottom={true}
														/>

														<RangeControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom
															initialPosition={item.position.mobile.top}
															label="Top"
															max={100}
															min={0}
															onChange={(value) => updateStepPosition(index, 'mobile', 'top', Number(value))}
														/>
														<RangeControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom
															initialPosition={item.position.mobile.right}
															label="Right"
															max={100}
															min={0}
															onChange={(value) => updateStepPosition(index, 'mobile', 'right', Number(value))}
														/>
													</div>
												</details>
											)}
										</Draggable>
									))}
									{provided.placeholder}
									<br /><hr />
									<Button
										variant="primary"
										onClick={onClickAddRepeaterItem}
									>
										Add
									</Button>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</PanelBody>
			</InspectorControls>

			{steps && (
				<style>{stepsStyles}</style>
			)}

			<section {...useBlockProps({ className: `sd-steps sd-steps--${instanceId}` })}>
				<div className="container">
					<div className="sd-steps__img-box">
						<RichText
							tagName="p"
							placeholder="Instruction"
							className="sd-steps__img-text"
							value={instruction || ''}
							onChange={(value) =>
								onChangeText('instruction', value)
							}
						/>


						{image.url ? (
							<img src={image.url} alt={image.alt} loading="lazy" />
						) : (
							<img src={placeholderImage} style={{ opacity: ".5" }} />
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
						<RichText
							tagName="h2"
							placeholder="Title"
							value={title || ''}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>

						<RichText
							tagName="h3"
							placeholder="Description"
							value={description || ''}
							onChange={(value) =>
								onChangeText('description', value)
							}
						/>

						{(link.show) && (
							<RichText
								tagName="a"
								href='#'
								placeholder="Link Title"
								style={!link.url ? { opacity: ".5" } : {}}
								target={link.target ? '_blank' : '_self'}
								value={link.title || ''}
								onChange={(value) => setAttributes({
									link: { ...link, title: value },
								})}
							/>
						)}

						{steps && (
							<div className="sd-steps__tabs">
								{steps.map((step, index) => (
									<div className="sd-steps__tab active">
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
