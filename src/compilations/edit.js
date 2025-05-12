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
	Button,
	ToggleControl,
	FormTokenField,
	Notice
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import placeholderImage from './c3.jpeg';

export default function Edit({ attributes, setAttributes }) {
	const { title, link, compilations } = attributes;
	const [activeIndex, setActiveIndex] = useState(0);

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const onChangeRepeaterItem = (index, value, field) => {
		const updatedArray = JSON.parse(JSON.stringify(compilations));
		updatedArray[index][field] = value;
		setAttributes({ compilations: updatedArray });
	};

	const onClickAddRepeaterItem = () => {
		const newItem = {
			title: "Название",
			link: {
				show: true,
				title: "Вся подборка",
				url: "",
				target: false,
				preview: {
					isVideo: false,
					url: "",
					id: 0
				}
			},
			products: []
		};

		const updatedArray = JSON.parse(JSON.stringify(compilations));
		updatedArray.push(newItem);
		setAttributes({ compilations: updatedArray });
	};

	const onDragEndRepeaterItem = (result) => {
		if (!result.destination) return;

		const newArray = Array.from(compilations);
		const [movedItem] = newArray.splice(result.source.index, 1);
		newArray.splice(result.destination.index, 0, movedItem);

		setAttributes({ compilations: newArray });
	};

	const onRemoveRepeaterItem = (index) => {
		const updatedArray = JSON.parse(JSON.stringify(compilations));
		updatedArray.splice(index, 1);
		setAttributes({ compilations: updatedArray });
	};

	const onChangeLinkField = (index, field, value) => {
		const updatedArray = JSON.parse(JSON.stringify(compilations));
		updatedArray[index].link[field] = value;
		setAttributes({ compilations: updatedArray });
	};

	const products = useSelect((select) => {
		const { getEntityRecords } = select('core');
		return getEntityRecords('postType', 'product', {
			per_page: -1,
			status: 'publish',
			_embed: true
		});
	});

	const productSuggestions = useMemo(() => {
		return (products || []).map((product) => ({
			label: product.title.rendered,
			value: String(product.id),
			image: product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
		}));
	}, [products]);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
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
									{compilations?.map((item, index) => (
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
														<span>= Tab {index + 1}</span>
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

														<h2>Main Link</h2>

														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Show link"
															checked={item.link.show}
															onChange={() => onChangeLinkField(index, 'show', !item.link.show)}
														/>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="Open new tab"
															checked={item.link.target}
															onChange={() => onChangeLinkField(index, 'target', !item.link.target)}
														/>

														<TextControl
															__nextHasNoMarginBottom={true}
															type="url"
															label="Link URL"
															value={item.link.url}
															onChange={(value) => onChangeLinkField(index, 'url', value)}
														/>
														<TextControl
															__nextHasNoMarginBottom={true}
															label="Link Title"
															value={item.link.title}
															onChange={(value) => onChangeLinkField(index, 'title', value)}
														/>

														<hr />

														<h2>Main Link Media</h2>

														<ToggleControl
															__nextHasNoMarginBottom={true}
															label="This is video"
															checked={item.link.preview.isVideo}
															onChange={() => {
																const updated = [...compilations];
																updated[index].link.preview.url = '';
																updated[index].link.preview.id = 0;
																updated[index].link.preview.isVideo = !item.link.preview.isVideo;
																setAttributes({ compilations: updated });
															}}
														/>

														<MediaUploadCheck>
															<MediaUpload
																onSelect={(media) => {
																	const updated = [...compilations];
																	updated[index].link.preview.url = media?.url || '';
																	updated[index].link.preview.id = media?.id || 0;
																	setAttributes({ compilations: updated });
																}}
																allowedTypes={item.link.preview.isVideo ? ['video'] : ['image']}
																value={item.link.preview.id}
																render={({ open }) => (
																	<>
																		{item.link.preview.url && (
																			item.link.preview.isVideo ? (
																				<video
																					src={item.link.preview.url}
																					autoPlay
																					muted
																					loop
																					playsInline
																					loading="lazy"
																				/>
																			) : (
																				<img
																					src={item.link.preview.url}
																					alt=""
																				/>
																			)
																		)}

																		<div style={{ display: 'flex', gap: '10px' }}>
																			<Button
																				size={item.link.preview.url ? 'small' : "default"}
																				variant={item.link.preview.url ? 'secondary' : "primary"}
																				onClick={open}
																			>
																				{item.link.preview.url ? 'Change' : 'Select'}
																				{item.link.preview.isVideo ? ' video' : ' image'}
																			</Button>

																			{item.link.preview.url && (
																				<Button
																					size='small'
																					isDestructive={true}
																					variant='secondary'
																					onClick={() => {
																						const updated = [...compilations];
																						updated[index].link.preview.url = '';
																						updated[index].link.preview.id = 0;
																						setAttributes({ compilations: updated });
																					}}
																				> x </Button>
																			)}
																		</div>
																	</>
																)}
															/>
														</MediaUploadCheck>

														<hr />

														<h2>Products</h2>
														{products ? (
															<FormTokenField
																__experimentalAutoSelectFirstMatch
																__experimentalExpandOnFocus
																__next40pxDefaultSize
																__nextHasNoMarginBottom
																__experimentalShowHowTo={false}
																label="Select Products"
																suggestions={productSuggestions.map((p) => p.label)}
																value={(compilations[index]?.products || []).map((p) => p.title)}
																onChange={(selectedLabels) => {
																	const selectedProducts = selectedLabels.map((label) => {
																		const found = productSuggestions.find((p) => p.label === label);
																		return found ? {
																			id: parseInt(found.value, 10),
																			title: found.label,
																			image: found.image,
																		} : null;
																	}).filter(Boolean);

																	const updated = [...compilations];
																	updated[index].products = selectedProducts;
																	setAttributes({ compilations: updated });
																}}
															/>
														) : (
															<Notice
																isDismissible={false}
																status="warning"
															>
																Install WooCommerce or add products to the database
															</Notice>
														)}
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

			<section {...useBlockProps({ className: 'sd-compilations' })}>
				<div className="container">
					{!products && (
						<Notice
							isDismissible={false}
							status="warning"
						>
							Install WooCommerce or add products to the database
						</Notice>
					)}

					<div className="sd-best__header">
						<RichText
							tagName="h2"
							value={title || ''}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>

						{(link.show) && (
							<RichText
								tagName="a"
								href='#'
								target={link.target ? '_blank' : '_self'}
								value={link.title || ''}
								onChange={(value) => setAttributes({
									link: { ...link, title: value },
								})}
							/>
						)}
					</div>

					{compilations && (
						<>
							<nav className="sd-compilations__nav-box">
								{compilations.map((compilation, index) => (
									<p
										key={index}
										className={`sd-compilations__nav${index === activeIndex ? ' active' : ''}`}
										onClick={() => setActiveIndex(index)}
									>
										{compilation.title}
									</p>
								))}
							</nav>

							{compilations.map((compilation, index) => {
								const products = compilation.products || [];

								return (
									<div
										key={index}
										className={`sd-compilations__cards-box${index === activeIndex ? ' active' : ''}`}
									>
										<div className="swiper swiper-best">
											<div className="swiper-wrapper">
												{(compilation.link.show && compilation.link.url) && (
													<a
														className="swiper-slide sd-compilations__link"
														href={compilation?.link?.url || '#'}
														target={compilation.link.target ? '_blank' : '_self'}
														style={{ minHeight: "400px" }}
													>
														{compilation.link.preview.url ? (
															compilation.link.preview.isVideo ? (
																<video
																	src={compilation.link.preview.url}
																	autoPlay
																	muted
																	loop
																	playsInline
																	loading="lazy"
																/>
															) : (
																<img
																	src={compilation.link.preview.url}
																	alt=""
																	loading="lazy"
																/>
															)
														) : (
															<img src={placeholderImage} style={{ opacity: ".5" }} />
														)}

														<p>{compilation.link.title} →</p>
													</a>
												)}

												{products && (
													products.map((product, product_index) => {
														const productImage = product?.image || placeholderImage;
														const productTitle = product.title || 'Без названия';

														return (
															<div key={product_index} className="swiper-slide sd-best__card">
																<div className="sd-best__img-box">
																	<a href="#" className="sd-best__img-link">
																		<img src={productImage} style={!product?.image ? { opacity: ".5" } : {}} />
																	</a>
																</div>
																<h4 className="sd-best__card-name">{productTitle}</h4>
															</div>
														)
													})
												)}
											</div>
										</div>
									</div>
								)
							})}
						</>
					)}
				</div>
			</section>
		</>
	);
}
