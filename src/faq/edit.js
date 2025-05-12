import {
	useBlockProps,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function Edit({ attributes, setAttributes }) {
	const { faq_block } = attributes;
	const [activeIndex, setActiveIndex] = useState(0);

	const onClickAddRepeaterItem = () => {
		const newItem = {
			title: "Вопрос",
			description: "Ответ"
		};

		const updatedArray = JSON.parse(JSON.stringify(faq_block));
		updatedArray.push(newItem);
		setAttributes({ faq_block: updatedArray });
	};

	const onChangeRepeaterItem = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(faq_block)); // глубокое клонирование
		updatedArray[index][field] = value;
		setAttributes({ faq_block: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(faq_block);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ faq_block: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(faq_block));
		updatedArray.splice(index, 1);
		setAttributes({
			faq_block: updatedArray,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<DragDropContext onDragEnd={onDragEndRepeaterItem}>
						<Droppable droppableId="array-list-droppable">
							{(provided) => (
								<div className="array-list-droppable"
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{faq_block?.map((faq_item, index) => (
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
														<span>= Question {index + 1}</span>
														<Button
															size="small"
															variant="secondary"
															isDestructive={true}
															title="Remove Question"
															onClick={() => onRemoveRepeaterItem(index)}
														>x</Button>
													</summary>

													<div>
														<TextControl
															label="Title"
															value={faq_item.title}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'title'
															)}
															__nextHasNoMarginBottom={true}
														/>
														<TextareaControl
															label="Description"
															value={faq_item.description}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'description'
															)}
															__nextHasNoMarginBottom={true}
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
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: 'sd-question__details' })}>
				<div className="sd-question__details">
					{(faq_block?.length > 0) ? (
						faq_block.map((faq_item, index) => (
							<div
								key={index}
								className="b-protocol__details"
								onClick={() => setActiveIndex(index)}
							>
								<RichText
									tagName="h4"
									className={`b-protocol__details-button ${(index === activeIndex) && 'active'}`}
									value={faq_item?.title || ''}
									onChange={(value) => onChangeRepeaterItem(
										index, value, 'title'
									)}
								/>

								<div className={`b-protocol__details-box ${(index === activeIndex) && 'active'}`}>
									<RichText
										tagName="p"
										value={faq_item?.description || ''}
										onChange={(value) => onChangeRepeaterItem(
											index, value, 'description'
										)}
									/>
								</div>
							</div>
						))
					) : (
							<div className="b-protocol__details" style={{opacity: ".5"}}>
							<h4 className="b-protocol__details-button">Вопрос</h4>
							<div className="b-protocol__details-box">
								<p>Ответ</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}