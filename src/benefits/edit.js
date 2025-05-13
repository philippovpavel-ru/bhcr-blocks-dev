import {
	useBlockProps,
	useInnerBlocksProps,
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
import placeholderImage from './benefits.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { mirror, title, image, links } = attributes;

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const onChangeRepeaterItem = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(links));
		updatedArray[index][field] = value;
		setAttributes({ links: updatedArray });
	};

	const onClickAddRepeaterItem = () => {
		const newItem = {
			title: "Link",
			url: "#",
			target: false
		};

		const updatedArray = JSON.parse(JSON.stringify(links));
		updatedArray.push(newItem);
		setAttributes({ links: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(links);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ links: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(links));
		updatedArray.splice(index, 1);
		setAttributes({ links: updatedArray });
	};

	const ImageTag = () => (
		<img
			src={image?.url || placeholderImage}
			alt={image?.alt || ''}
			loading="lazy"
			style={!image?.url ? {opacity: ".5"} : {}}
		/>
	);

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'sd-benefits__text' }, // props для обертки
		{
			allowedBlocks: ['core/heading', 'core/list'],
			template: [
				['core/heading', {
					level: 3,
					content: 'Тонер обладает легкой текстурой, быстро впитывается, не&nbsp;оставляет ощущения липкости'
				}],
				['core/list'],
			],
		}
	);

	const styles = '.sd-benefits__text * {margin: 0;padding: 0;box- sizing: border-box;}';

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

				<PanelBody title="Links">
					<DragDropContext onDragEnd={onDragEndRepeaterItem}>
						<Droppable droppableId="array-list-droppable">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="array-list-droppable"
								>
									{links?.map((item, index) => (
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
														<span>= Link {index + 1}</span>
														<Button
															size="small"
															variant="secondary"
															isDestructive={true}
															title="Remove item"
															onClick={() => onRemoveRepeaterItem(index)}
														>x</Button>
													</summary>

													<div>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Open new tab"
															checked={item.target}
															onChange={() => onChangeRepeaterItem(
																index, !item.target, 'target'
															)}
														/>
														<TextControl
															__nextHasNoMarginBottom={true}
															type="url"
															label="Link URL"
															value={item.url}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'url'
															)}
														/>
														<TextControl
															__nextHasNoMarginBottom={true}
															label="Link Title"
															value={item.title}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'title'
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
									>
										Add
									</Button>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</PanelBody>
			</InspectorControls>

			<style>{styles}</style>

			<section {...useBlockProps({ className: 'sd-benefits' })}>
				<RichText
					tagName="h2"
					value={title || ''}
					placeholder="Title"
					onChange={(value) =>
						onChangeText('title', value)
					}
				/>

				{links && (
					<ul className="snd-tabs">
						{links?.map((link, index) => (
							<li key={index}>
								<a
									href={link.url}
									target={link.target ? '_blank' : '_self'}
								>
									{link.title}
								</a>
							</li>
						))}
					</ul>
				)}

				<div className="sd-benefits__grid">
					{mirror && (
						ImageTag()
					)}

					<div {...innerBlocksProps} />

					{!mirror && (
						ImageTag()
					)}
				</div>
			</section>
		</>
	);
}
