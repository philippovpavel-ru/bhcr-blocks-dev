import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import placeholderImage from './t2.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { images } = attributes;

	const onClickAddRepeaterItem = () => {
		const newItem = {
			id: 0,
			url: "",
			alt: ""
		};

		const updatedArray = JSON.parse(JSON.stringify(images));
		updatedArray.push(newItem);
		setAttributes({ images: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(images);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ images: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(images));
		updatedArray.splice(
			index,
			1
		);
		setAttributes({
			images: updatedArray,
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
									{images?.map((image, index) => (
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
														<span>= Image {index + 1}</span>
														<Button
															size="small"
															variant="secondary"
															isDestructive={true}
															title="Remove Item"
															onClick={() => onRemoveRepeaterItem(index)}
														>x</Button>
													</summary>

													<div>
														<MediaUploadCheck>
															<MediaUpload
																onSelect={(media) => {
																	const url = media?.sizes?.medium?.url || media?.url || '';

																	const updatedArray = JSON.parse(JSON.stringify(images));
																	updatedArray[index] = {
																		id: media?.id || 0,
																		url: url,
																		alt: media?.alt || ''
																	};

																	setAttributes({ images: updatedArray });
																}}
																allowedTypes={'image'}
																value={image.id}
																render={({ open }) => (
																	<>
																		{image.url && (
																			<img src={image.url} />
																		)}

																		<div style={{ "display": 'flex', "gap": '15px' }}>
																			<Button
																				size={image.url ? 'small' : "default"}
																				variant={image.url ? 'secondary' : "primary"}
																				onClick={open}>
																				{image.url ? 'Change' : "Select"} image
																			</Button>
																		</div>
																	</>
																)}
															/>
														</MediaUploadCheck>
													</div>

												</details>
											)}
										</Draggable>
									))}

									{provided.placeholder}

									{images.length < 3 && (
										<>
											<hr />
											<Button
												variant="primary"
												onClick={onClickAddRepeaterItem}
											>
												Add
											</Button>
										</>
									)}
								</div>
							)}
						</Droppable>
					</DragDropContext>

				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: "sd-technologies__imgs" })}>
				{(images && images.length > 0) ? (
					images.map((image, index) => (
						<img key={index} src={image?.url || placeholderImage} alt={image?.alt || ''} />
					))
				) : (
					<>
						<img src={placeholderImage} style={{ opacity: ".5" }} />
						<img src={placeholderImage} style={{ opacity: ".5" }} />
						<img src={placeholderImage} style={{ opacity: ".5" }} />
					</>
				)}
			</div>
		</>
	);
}
