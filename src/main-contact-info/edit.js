import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Button,
	TextControl
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function Edit({ attributes, setAttributes }) {
	const { list } = attributes;

	const onChangeRepeaterItem = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(list));
		updatedArray[index][field] = value;
		setAttributes({ list: updatedArray });
	};

	const onClickAddRepeaterItem = () => {
		const newItem = {
			title: "Title",
			link: {
				title: "Link",
				url: "#",
				target: false
			}
		};

		const updatedArray = JSON.parse(JSON.stringify(list));
		updatedArray.push(newItem);
		setAttributes({ list: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(list);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ list: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(list));
		updatedArray.splice(index, 1);
		setAttributes({ list: updatedArray });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<DragDropContext onDragEnd={onDragEndRepeaterItem}>
						<Droppable droppableId="array-list-droppable">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="array-list-droppable"
								>
									{list?.map((item, index) => (
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
														<TextControl
															label="Title"
															value={item.title}
															onChange={(value) => onChangeRepeaterItem(
																index, value, 'title'
															)}
															__nextHasNoMarginBottom={true}
														/>

														<hr />
														<h2>Link</h2>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Open new tab"
															checked={item.link.target}
															onChange={() => {
																const newLink = {
																	...item.link,
																	target: !item.link.target,
																};
																onChangeRepeaterItem(index, newLink, 'link');
															}}
														/>
														<TextControl
															__nextHasNoMarginBottom={true}
															type="url"
															label="Link URL"
															value={item.link.url}
															onChange={(value) => {
																const newLink = {
																	...item.link,
																	url: value,
																};
																onChangeRepeaterItem(index, newLink, 'link');
															}}
														/>
														<TextControl
															__nextHasNoMarginBottom={true}
															label="Link Title"
															value={item.link.title}
															onChange={(value) => {
																const newLink = {
																	...item.link,
																	title: value,
																};
																onChangeRepeaterItem(index, newLink, 'link');
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

			<nav {...useBlockProps({ className: 'sd-footer__links-column' })}>
				<ul style={{paddingLeft: "0"}}>
					{list?.map((item, index) => (
						<li key={index} className="menu-item menu-item_contact">
							{item.title && (<p>{item.title}</p>)}

							{item?.link?.url && (
								<a href="#">{item?.link?.title || 'Link'}</a>
							)}
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
