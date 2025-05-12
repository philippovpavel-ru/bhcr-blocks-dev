import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
	SelectControl
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function Edit({ attributes, setAttributes }) {
	const { type, title, listBoxTitle, listBoxSubtitle, vacancies } = attributes;

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const onChangeRepeaterItem = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(vacancies));
		updatedArray[index][field] = value;
		setAttributes({ vacancies: updatedArray });
	};

	const onClickAddRepeaterItem = () => {
		const newItem = {
			title: type === 'default' ? "Должность" : "Зарегистрируйтесь",
			description: type === 'default' ? "Описание" : "",
			url: "#",
			target: false
		};

		const updatedArray = JSON.parse(JSON.stringify(vacancies));
		updatedArray.push(newItem);
		setAttributes({ vacancies: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(vacancies);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ vacancies: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(vacancies));
		updatedArray.splice(index, 1);
		setAttributes({ vacancies: updatedArray });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom={true}
						label="Type"
						value={type}
						onChange={(value) => onChangeText('type', value)}
						options={[
							{
								disabled: true,
								label: 'Select an type',
								value: ''
							},
							{
								label: 'Default',
								value: 'default'
							},
							{
								label: 'Club',
								value: 'club'
							}
						]}
					/>
					<TextControl
						__nextHasNoMarginBottom={true}
						label="List box title"
						value={listBoxTitle}
						onChange={(value) => onChangeText('listBoxTitle', value)}
					/>
					{type === 'club' && (
						<TextControl
							__nextHasNoMarginBottom={true}
							label="List box mobile title"
							value={listBoxSubtitle}
							onChange={(value) => onChangeText('listBoxSubtitle', value)}
						/>
					)}
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
									{vacancies?.map((item, index) => (
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
															__nextHasNoMarginBottom={true}
															label="Item Title"
															value={item.title}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'title'
															)}
														/>

														{type === 'default' && (
															<TextControl
																__nextHasNoMarginBottom={true}
																label="Item Description"
																value={item.description}
																onChange={(value) => onChangeRepeaterItem(
																	index, value, 'description'
																)}
															/>
														)}

														<TextControl
															__nextHasNoMarginBottom={true}
															type="url"
															label="Link URL"
															value={item.url}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'url'
															)}
														/>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Open new tab"
															checked={item.target}
															onChange={() => onChangeRepeaterItem(
																index, !item.target, 'target'
															)}
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
									>Add</Button>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: `sd-vacancies-list sd-vacancies-list_${type}` })}>
				<div className="container">
					<RichText
						tagName="h2"
						value={title || ''}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>

					<div className="sd-vacancies-list__box">
						{type === 'club' && (
							<RichText
								tagName="h4"
								value={listBoxSubtitle || ''}
								onChange={(value) =>
									onChangeText('listBoxTitle', value)
								}
							/>
						)}

						<RichText
							tagName="h3"
							value={listBoxTitle || ''}
							onChange={(value) =>
								onChangeText('listBoxTitle', value)
							}
						/>

						{vacancies && (
							<div className="sd-vacancies-list__rows">
								{vacancies?.map((item, index) => (
									<a key={index} href="#" className="sd-vacancies-list__row">
										<RichText
											tagName={type === "default" ? "h4" : "p"}
											value={item?.title || ''}
											onChange={(value) => onChangeRepeaterItem(
												index, value, 'title'
											)}
										/>

										{type === "default" && (
											<RichText
												tagName="p"
												value={item?.description || ''}
												onChange={(value) => onChangeRepeaterItem(
													index, value, 'description'
												)}
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
		</>
	);
}
