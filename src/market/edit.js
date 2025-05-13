import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	ToggleControl,
	TextControl
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import placeholderImage from './m1.svg';

export default function Edit({ attributes, setAttributes }) {
	const { title, images } = attributes;
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const onChangeRepeaterItem = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(images));
		updatedArray[index][field] = value;
		setAttributes({ images: updatedArray });
	};

	const onClickAddRepeaterItem = () => {
		const newItem = {
			"img": {
				"id": 0,
				"url": "",
				"alt": ""
			},
			"link": {
				"title": "Market",
				"url": "#",
				"target": true
			}
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

																	const updatedImage = {
																		id: media?.id || 0,
																		url: url,
																		alt: media?.id || ''
																	};

																	onChangeRepeaterItem(index, updatedImage, 'img');
																}}
																allowedTypes={'image'}
																value={image.img.id}
																render={({ open }) => (
																	<>
																		{image.img.url && (
																			<img src={image.img.url} />
																		)}

																		<div style={{ "display": 'flex', "gap": '15px' }}>
																			<Button
																				size={image.img.url ? 'small' : "default"}
																				variant={image.img.url ? 'secondary' : "primary"}
																				onClick={open}>
																				{image.img.url ? 'Change' : "Select"} image
																			</Button>
																		</div>
																	</>
																)}
															/>
														</MediaUploadCheck>

														<hr />
														<h2>Link</h2>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Open new tab"
															checked={image.link.target}
															onChange={() => {
																const updatedLink = {
																	...image.link,
																	target: !image.link.target
																};

																onChangeRepeaterItem(index, updatedLink, 'link');
															}}
														/>
														<TextControl
															__nextHasNoMarginBottom={true}
															type="url"
															label="Link URL"
															value={image.link.url}
															onChange={(value) => {
																const updatedLink = {
																	...image.link,
																	url: value
																};

																onChangeRepeaterItem(index, updatedLink, 'link');
															}}
														/>
														<TextControl
															__nextHasNoMarginBottom={true}
															label="Link Title"
															value={image.link.title}
															onChange={(value) => {
																const updatedLink = {
																	...image.link,
																	title: value
																};

																onChangeRepeaterItem(index, updatedLink, 'link');
															}}
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

			<section  {...useBlockProps({ className: 'sd-market' })}>
				<div className="container">
					<RichText
						tagName="h2"
						value={title || ''}
						placeholder="Title"
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>

					<div className="sd-market__grid">
						{(images && images.length > 0) ? (
							images.map((image, index) => (
								<a
									key={index}
									href={image.link.url}
									target={image.link.target ? '_blank' : '_self'}
									title={image.link.title}
								>
									<img src={image.img?.url || placeholderImage} alt={image.img?.alt || ''} />
								</a>
							))
						) : (
							<>
								<img src={placeholderImage} style={{ opacity: ".5" }} />
								<img src={placeholderImage} style={{ opacity: ".5" }} />
								<img src={placeholderImage} style={{ opacity: ".5" }} />
							</>
						)}
					</div>
				</div>
			</section>
		</>
	);
}