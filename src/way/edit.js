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
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import placeholderImage from './way.jpeg';

// Добавляю функцию нормализации steps
function normalizeSteps(steps) {
	return (steps || []).map((step, i) => {
		if (typeof step === 'string') {
			return {
				title: `Шаг ${i + 1}`,
				content: step,
			};
		}
		return step;
	});
}

export default function Edit({ attributes, setAttributes }) {
	const { mirror, title, description, stepPrefix, image, steps, isStepsAdvanced } = attributes;

	// Нормализуем steps для работы везде как с массивом объектов
	const normalizedSteps = normalizeSteps(steps);

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const onChangeRepeaterItem = (index, value) => {
		const updatedArray = JSON.parse(JSON.stringify(normalizedSteps));
		updatedArray[index].content = value;
		setAttributes({ steps: updatedArray });
	};

	const onChangeRepeaterItemNew = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(normalizedSteps));
		updatedArray[index][field] = value;
		setAttributes({ steps: updatedArray });
	};

	const onClickAddRepeaterItem = () => {
		const newItem = {
			title: `Шаг ${normalizedSteps.length + 1}`,
			content: ""
		};

		const updatedArray = JSON.parse(JSON.stringify(normalizedSteps));
		updatedArray.push(newItem);
		setAttributes({ steps: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(normalizedSteps);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ steps: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(normalizedSteps));
		updatedArray.splice(index, 1);
		setAttributes({ steps: updatedArray });
	};

	const ImageTag = () => (
		<img
			src={image?.url || placeholderImage}
			alt={image?.alt || ''}
			loading="lazy"
			style={!image?.url ? { opacity: ".5" } : {}}
		/>
	);

	const styles = '.sd-way__text * {margin: 0;padding: 0;box- sizing: border-box;} .sd-way__grid > img {height: inherit; width: 100%; object-fit: cover;}';

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label="Swap"
						checked={mirror}
						onChange={() => setAttributes({ mirror: !mirror })}
					/>
					<hr />
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
				</PanelBody>

				<PanelBody title="Steps">
					<ToggleControl
						label="Расширенный режим шагов"
						checked={!!isStepsAdvanced}
						onChange={() => setAttributes({ isStepsAdvanced: !isStepsAdvanced })}
					/>
					<hr />
					{!isStepsAdvanced && (
						<>
							<TextControl
								__nextHasNoMarginBottom={true}
								label="Step Number Prefix"
								value={stepPrefix}
								onChange={(value) =>
									onChangeText('stepPrefix', value)
								}
							/>
							<hr />
							<DragDropContext onDragEnd={onDragEndRepeaterItem}>
								<Droppable droppableId="array-list-droppable">
									{(provided) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className="array-list-droppable"
										>
											{normalizedSteps?.map((item, index) => (
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
																<span>= Itex {index + 1}</span>
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
																	__nextHasNoMarginBottom={true}
																	label="Text"
																	value={item.content}
																	onChange={(value) => onChangeRepeaterItem(index, value)}
																/>
															</div>
														</details>
													)}
												</Draggable>
											))}
											{provided.placeholder}
											<hr />
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
						</>
					)}
					{isStepsAdvanced && (
						<>
							<DragDropContext onDragEnd={onDragEndRepeaterItem}>
								<Droppable droppableId="array-list-droppable">
									{(provided) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className="array-list-droppable"
										>
											{normalizedSteps?.map((item, index) => (
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
																<span>= Itex {index + 1}</span>
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
																	__nextHasNoMarginBottom={true}
																	label="Title"
																	value={item.title}
																	onChange={(value) => onChangeRepeaterItemNew(
																		index, value, "title"
																	)}
																/>
																<TextControl
																	__nextHasNoMarginBottom={true}
																	label="Text"
																	value={item.content}
																	onChange={(value) => onChangeRepeaterItemNew(index, value, "content")}
																/>
															</div>
														</details>
													)}
												</Draggable>
											))}
											{provided.placeholder}
											<hr />
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
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<style>{styles}</style>

			<section {...useBlockProps({ className: 'sd-way' })}>
				<RichText
					tagName="h2"
					placeholder="Title"
					value={title || ''}
					onChange={(value) =>
						onChangeText('title', value)
					}
				/>

				<div className="sd-way__grid">
					{mirror && (
						ImageTag()
					)}

					<div className="sd-way__text">
						<RichText
							tagName="h3"
							placeholder="Description"
							value={description || ''}
							onChange={(value) =>
								onChangeText('description', value)
							}
						/>

						<ul>
							{normalizedSteps && (
								<>
									{normalizedSteps?.map((step, index) => (
										<li key={index} style={{ position: "relative", paddingRight: "30px" }}>
											{!isStepsAdvanced && <span>{`${stepPrefix} ${index + 1}`}</span>}
											{isStepsAdvanced && (
												<RichText
													tagName='span'
													value={step.title}
													placeholder='Введите заголовок шага'
												/>
											)}
											<RichText
												tagName='div'
												value={step.content}
												placeholder='Введите текст шага'
											/>

											<Button
												size="small"
												variant="secondary"
												isDestructive={true}
												style={{position: "absolute", inset: "0", left: "auto", margin: "auto"}}
												title="Remove item"
												onClick={() => onRemoveRepeaterItem(index)}
											>x</Button>
										</li>
									))}
								</>
							)}
							<li title="Add">
								<Button
									variant="primary"
									style={{ padding: "0 30px", backgroundColor: "rgb(0, 77, 65)"}}
									onClick={onClickAddRepeaterItem}
								>
									Add
								</Button>
							</li>
						</ul>
					</div>

					{!mirror && (
						ImageTag()
					)}
				</div>
			</section>
		</>
	);
}
