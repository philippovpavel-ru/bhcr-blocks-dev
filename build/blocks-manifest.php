<?php
// This file is generated. Do not modify it manually.
return array(
	'article' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/article',
		'version' => '0.1.0',
		'title' => 'Article',
		'category' => 'snd-blocks-other',
		'icon' => 'media-text',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'benefits' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/benefits',
		'version' => '0.1.0',
		'title' => 'Benefits',
		'category' => 'snd-blocks-product',
		'icon' => 'yes-alt',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'mirror' => array(
				'type' => 'boolean',
				'default' => false
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Преимущества'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'links' => array(
				'type' => 'array',
				'default' => array(
					array(
						'title' => 'Действие',
						'url' => '#',
						'target' => false
					),
					array(
						'title' => 'Ингредиенты',
						'url' => '#',
						'target' => false
					),
					array(
						'title' => 'Технологии',
						'url' => '#',
						'target' => false
					),
					array(
						'title' => 'Способ применения',
						'url' => '#',
						'target' => false
					),
					array(
						'title' => 'Отзывы',
						'url' => '#',
						'target' => false
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'best' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/best',
		'version' => '0.1.0',
		'title' => 'Best',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'thumbs-up',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'hideCount' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isProduct' => array(
				'type' => 'boolean',
				'default' => false
			),
			'count' => array(
				'type' => 'number',
				'default' => 0
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Мы собрали лучшее'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Откройте для себя всё: от бестселлеров до новинок'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => 'Купить лучшее',
					'url' => '',
					'target' => false
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'best-product-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/best-product-card',
		'version' => '0.1.0',
		'title' => 'Best product card',
		'category' => 'snd-blocks-other',
		'icon' => 'smiley',
		'example' => array(
			
		),
		'parent' => array(
			'snd/best'
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'product' => array(
				'type' => 'object'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'blog' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/blog',
		'version' => '0.1.0',
		'title' => 'Blog',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'columns',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Еще вам может быть интересно'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'blog-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/blog-card',
		'version' => '0.1.0',
		'title' => 'Blog Card',
		'category' => 'snd-blocks-other',
		'icon' => 'admin-page',
		'example' => array(
			
		),
		'parent' => array(
			'snd/blog'
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'журнал & новости'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'В журнале мы рассказываем о новых продуктах, актуальных предложениях, делимся бьюти лайфхаками, статьями о ... тут нужно дополнить'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => 'Читать',
					'url' => '',
					'target' => false
				)
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'club' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/club',
		'version' => '0.1.0',
		'title' => 'Club',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'format-image',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Присоединяйтесь к&nbsp;BOHICARE Privilege CLUB'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Блок под текстовое описание клуба, правил, условий в виде двух полноценных строк. Блок под текстовое описание клуба'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => 'Подробнее',
					'url' => '',
					'target' => false
				)
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'compilations' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/compilations',
		'version' => '0.1.0',
		'title' => 'Compilations',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'products',
		'example' => array(
			
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Актуальные подборки'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => 'Купить всё',
					'url' => '',
					'target' => false
				)
			),
			'compilations' => array(
				'type' => 'array',
				'default' => array(
					array(
						'title' => 'Сухость',
						'link' => array(
							'show' => true,
							'title' => 'Вся подборка',
							'url' => '',
							'target' => false,
							'preview' => array(
								'isVideo' => false,
								'url' => '',
								'id' => 0
							)
						),
						'products' => array(
							
						)
					),
					array(
						'title' => 'Акне и высыпания',
						'link' => array(
							'show' => true,
							'title' => 'Вся подборка',
							'url' => '',
							'target' => false,
							'preview' => array(
								'isVideo' => false,
								'url' => '',
								'id' => 0
							)
						),
						'products' => array(
							
						)
					),
					array(
						'title' => 'Возрастные изменения',
						'link' => array(
							'show' => true,
							'title' => 'Вся подборка',
							'url' => '',
							'target' => false,
							'preview' => array(
								'isVideo' => false,
								'url' => '',
								'id' => 0
							)
						),
						'products' => array(
							
						)
					),
					array(
						'title' => 'Чувствительность',
						'link' => array(
							'show' => true,
							'title' => 'Вся подборка',
							'url' => '',
							'target' => false,
							'preview' => array(
								'isVideo' => false,
								'url' => '',
								'id' => 0
							)
						),
						'products' => array(
							
						)
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'faq' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/faq',
		'version' => '0.1.0',
		'title' => 'FAQ',
		'category' => 'snd-blocks-other',
		'icon' => 'editor-help',
		'example' => array(
			
		),
		'attributes' => array(
			'faq_block' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'form' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/form',
		'version' => '0.1.0',
		'title' => 'Form',
		'category' => 'snd-blocks-other',
		'icon' => 'editor-table',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Мы открыты к диалогу и готовы ответить на все ваши вопросы'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Есть вопрос, идея или предложение о сотрудничестве? Пожалуйста, свяжитесь с нами!'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'ingredient-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/ingredient-card',
		'version' => '0.1.0',
		'title' => 'Ingredient card',
		'category' => 'snd-blocks-other',
		'icon' => 'format-image',
		'parent' => array(
			'snd/ingredients'
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Идебедон'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Ниациамид – это витамин B3. Укрепляет гидролипидный барьер кожи'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'ingredients' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/ingredients',
		'version' => '0.1.0',
		'title' => 'Ingredients',
		'category' => 'snd-blocks-product',
		'icon' => 'editor-insertmore',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'ИНГРЕДИЕНТЫ'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Компоненты, которые делают это средство особенным'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'title' => 'Весь состав',
					'url' => '',
					'show' => true,
					'target' => true
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'invite' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/invite',
		'version' => '0.1.0',
		'title' => 'Invite',
		'category' => 'snd-blocks-other',
		'icon' => 'editor-table',
		'example' => array(
			
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Приглашаем истинных ценителей премиальной корейской косметики присоединиться к Bohicare Privilege Club'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Bohicare Privilege Club'
			),
			'description_01' => array(
				'type' => 'string',
				'default' => 'Это престижный клуб привилегий, созданный для проявления признательности нашим покупателям. Bohicare искренне благодарен тем, кто выбирает наш бренд, делая его неотъемлемой частью своего ежедневного ухода.'
			),
			'description_02' => array(
				'type' => 'string',
				'default' => 'Все участники клуба получают доступ к роскошным подаркам, эксклюзивным предложениям, а также приглашениям на уникальные мероприятия бренда, которые планирует проводить компания.'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'invite-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/invite-card',
		'version' => '0.1.0',
		'title' => 'Invite card',
		'category' => 'snd-blocks-other',
		'icon' => 'format-image',
		'parent' => array(
			'snd/invite'
		),
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'love' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/love',
		'version' => '0.1.0',
		'title' => 'Love',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'carrot',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'type' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'mirror' => array(
				'type' => 'boolean',
				'default' => false
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'love-link-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/love-link-block',
		'version' => '0.1.0',
		'title' => 'Love link block',
		'category' => 'snd-blocks-other',
		'icon' => 'admin-links',
		'parent' => array(
			'snd/love'
		),
		'attributes' => array(
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => 'Купить',
					'url' => '',
					'target' => false
				)
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'love-product-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/love-product-card',
		'version' => '0.1.0',
		'title' => 'Love product card',
		'category' => 'snd-blocks-other',
		'icon' => 'cart',
		'example' => array(
			
		),
		'parent' => array(
			'snd/love'
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'product' => array(
				'type' => 'object'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'main' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main',
		'version' => '0.1.0',
		'title' => 'Main',
		'category' => 'snd-blocks-other',
		'icon' => 'welcome-view-site',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'mobHeader' => array(
				'type' => 'boolean',
				'default' => true
			),
			'mirror' => array(
				'type' => 'boolean',
				'default' => false
			),
			'type' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Связаться с&nbsp;нами'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'main-button-link' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main-button-link',
		'version' => '0.1.0',
		'title' => 'Main button link',
		'category' => 'snd-blocks-other',
		'icon' => 'button',
		'example' => array(
			
		),
		'parent' => array(
			'snd/main'
		),
		'attributes' => array(
			'link' => array(
				'type' => 'object',
				'default' => array(
					'title' => 'Зарегистрироваться',
					'url' => '#',
					'target' => false
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => false,
			'align' => false
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'main-contact-info' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main-contact-info',
		'version' => '0.1.0',
		'title' => 'Main contact info',
		'category' => 'snd-blocks-other',
		'icon' => 'info',
		'parent' => array(
			'snd/main'
		),
		'attributes' => array(
			'list' => array(
				'type' => 'array',
				'default' => array(
					array(
						'title' => 'Общая',
						'link' => array(
							'title' => 'info@bohicare.com',
							'url' => 'mailto:info@bohicare.com',
							'target' => false
						)
					),
					array(
						'title' => 'PR & Сотрудничество',
						'link' => array(
							'title' => 'pr@bohicare.com',
							'url' => 'mailto:pr@bohicare.com',
							'target' => false
						)
					),
					array(
						'title' => 'Служба заботы',
						'link' => array(
							'title' => 'orders@bohicare.com',
							'url' => 'mailto:orders@bohicare.com',
							'target' => false
						)
					),
					array(
						'title' => 'Телеграм',
						'link' => array(
							'title' => 'bohicare_bot',
							'url' => 'https://t.me/',
							'target' => true
						)
					),
					array(
						'title' => 'Сайт',
						'link' => array(
							'title' => 'bohicare.com',
							'url' => 'https://bohicare.com/',
							'target' => false
						)
					),
					array(
						'title' => 'Соцсети',
						'link' => array(
							'title' => '@bohicare',
							'url' => 'https://t.me/',
							'target' => true
						)
					),
					array(
						'title' => 'Адрес',
						'link' => array(
							'title' => 'Seoul, Gangseo-gu, Magok-dong 774-9 Scienstar Room 1220',
							'url' => '#',
							'target' => false
						)
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'main-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main-text',
		'version' => '0.1.0',
		'title' => 'Main text',
		'category' => 'snd-blocks-other',
		'icon' => 'editor-textcolor',
		'example' => array(
			
		),
		'parent' => array(
			'snd/main'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string',
				'default' => 'Наша компания быстро растёт. Мы всегда открыты для сотрудничества, новых проектов и совместной работы...'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => false,
			'align' => false,
			'className' => false
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'main-text-bold' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main-text-bold',
		'version' => '0.1.0',
		'title' => 'Main text bold',
		'category' => 'snd-blocks-other',
		'icon' => 'editor-bold',
		'example' => array(
			
		),
		'parent' => array(
			'snd/main'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string',
				'default' => 'Уважаемый партнер, благодарим вас за проявленный интерес к Bohicare.'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => false,
			'align' => false,
			'className' => false
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'map' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/map',
		'version' => '0.1.0',
		'title' => 'Map',
		'category' => 'snd-blocks-other',
		'icon' => 'location-alt',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Адреса наших Партнёров'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'market' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/market',
		'version' => '0.1.0',
		'title' => 'Market',
		'category' => 'snd-blocks-other',
		'icon' => 'editor-insertmore',
		'example' => array(
			
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Так же Bohicare можно купить на маркетплейсах'
			),
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'mutted-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/mutted-text',
		'version' => '0.1.0',
		'title' => 'Mutted text',
		'category' => 'snd-blocks-other',
		'icon' => 'editor-paragraph',
		'example' => array(
			
		),
		'parent' => array(
			'snd/support-text'
		),
		'attributes' => array(
			'description' => array(
				'type' => 'string',
				'default' => 'ВАЖНО: при оформлении заказа скидки и промокоды не распространяются на стоимость доставки'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'parallax-sections' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/parallax-sections',
		'version' => '0.1.0',
		'title' => 'Parallax Sections',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'insert',
		'supports' => array(
			'html' => false,
			'anchor' => false,
			'align' => false,
			'className' => false
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'pendant' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/pendant',
		'version' => '0.1.0',
		'title' => 'Pendant',
		'category' => 'snd-blocks-other',
		'icon' => 'align-wide',
		'example' => array(
			
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Каждый член клуба становится обладателем кулона в виде бабочки, неотъемлемого символа нашего бренда'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Элегантное украшение, которое объединяет всех участников Bohicare Privilege Club'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'steps' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/steps',
		'version' => '0.1.0',
		'title' => 'Steps',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'editor-ol',
		'example' => array(
			
		),
		'attributes' => array(
			'instanceId' => array(
				'type' => 'string'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'PRO-AGE LINE'
			),
			'description' => array(
				'type' => 'string',
				'default' => '5&nbsp;простых шагов для сияющей и&nbsp;здоровой кожи лица'
			),
			'instruction' => array(
				'type' => 'string',
				'default' => 'Нажмите на номер, чтобы посмотреть всю линейку'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => 'Купить линейку',
					'url' => '',
					'target' => false
				)
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'steps' => array(
				'type' => 'array',
				'default' => array(
					array(
						'title' => 'Пенка для умывания',
						'description' => 'Очищение / Восстановление / Увлажнение',
						'position' => array(
							'desktop' => array(
								'top' => 57,
								'right' => 23
							),
							'tablet' => array(
								'active' => true,
								'width' => 424,
								'top' => 57,
								'right' => 11
							),
							'mobile' => array(
								'active' => true,
								'width' => 374,
								'top' => 57,
								'right' => 5
							)
						)
					),
					array(
						'title' => 'Тоник для лица',
						'description' => 'Увлажнение / Выравнивание / Тонизирование',
						'position' => array(
							'desktop' => array(
								'top' => 22,
								'right' => 42
							),
							'tablet' => array(
								'active' => false,
								'width' => 767,
								'top' => 22,
								'right' => 42
							),
							'mobile' => array(
								'active' => false,
								'width' => 374,
								'top' => 22,
								'right' => 42
							)
						)
					),
					array(
						'title' => 'Сыворотка',
						'description' => 'Увлажнение / Выравнивание / Тонизирование',
						'position' => array(
							'desktop' => array(
								'top' => 49,
								'right' => 61
							),
							'tablet' => array(
								'active' => false,
								'width' => 767,
								'top' => 49,
								'right' => 61
							),
							'mobile' => array(
								'active' => false,
								'width' => 374,
								'top' => 49,
								'right' => 61
							)
						)
					),
					array(
						'title' => 'Лифтинг крем для глаз',
						'description' => 'Увлажнение / Выравнивание / Тонизирование',
						'position' => array(
							'desktop' => array(
								'top' => 35,
								'right' => 66
							),
							'tablet' => array(
								'active' => false,
								'width' => 767,
								'top' => 35,
								'right' => 61
							),
							'mobile' => array(
								'active' => true,
								'width' => 424,
								'top' => 35,
								'right' => 74
							)
						)
					),
					array(
						'title' => 'Лифтинг крем для лица',
						'description' => 'Увлажнение / Выравнивание / Тонизирование',
						'position' => array(
							'desktop' => array(
								'top' => 73,
								'right' => 50
							),
							'tablet' => array(
								'active' => true,
								'width' => 991,
								'top' => 82,
								'right' => 50
							),
							'mobile' => array(
								'active' => true,
								'width' => 767,
								'top' => 73,
								'right' => 50
							)
						)
					),
					array(
						'title' => 'Коллагеновая лифтинг-маска',
						'description' => 'Увлажнение / Выравнивание / Тонизирование',
						'position' => array(
							'desktop' => array(
								'top' => 24,
								'right' => 35
							),
							'tablet' => array(
								'active' => false,
								'width' => 767,
								'top' => 24,
								'right' => 35
							),
							'mobile' => array(
								'active' => false,
								'width' => 374,
								'top' => 24,
								'right' => 35
							)
						)
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'support-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/support-text',
		'version' => '0.1.0',
		'title' => 'Support text',
		'category' => 'snd-blocks-other',
		'icon' => 'media-text',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'technologies' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/technologies',
		'version' => '0.1.0',
		'title' => 'Technologies',
		'category' => 'snd-blocks-product',
		'icon' => 'index-card',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Особенность'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Здесь что-то общее про подход к технологиям'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Water Holding System&nbsp;&mdash; многоуровневая система удержания воды'
			),
			'text_technologies' => array(
				'type' => 'string',
				'default' => 'Благодаря этой технологии, увлажняющие ингредиенты наиболее эффективно проникают в клетки кожи, наполняя их необходимым количеством влаги.'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'mirror' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'technology-img' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/technology-img',
		'version' => '0.1.0',
		'title' => 'Technology img',
		'category' => 'snd-blocks-other',
		'icon' => 'format-image',
		'example' => array(
			
		),
		'parent' => array(
			'snd/technologies'
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'vacancies-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/vacancies-list',
		'version' => '0.1.0',
		'title' => 'Vacancies list',
		'category' => 'snd-blocks-other',
		'icon' => 'businessman',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'type' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'В Bohicare мы прислушиваемся к мнению каждого, ценим вовлеченность, командную работу, взаимовыручку и работу на результат'
			),
			'listBoxTitle' => array(
				'type' => 'string',
				'default' => 'Открытые позиции'
			),
			'listBoxSubtitle' => array(
				'type' => 'string',
				'default' => 'Чтобы стать участником Bohicare Privilege Club'
			),
			'vacancies' => array(
				'type' => 'array',
				'default' => array(
					array(
						'title' => 'Бренд-амбасадор',
						'description' => 'Полная занятость / Весь мир',
						'url' => '#',
						'target' => false
					),
					array(
						'title' => 'Контент-креатор',
						'description' => 'Частичная занятость / Сеул',
						'url' => '#',
						'target' => false
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'way' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/way',
		'version' => '0.1.0',
		'title' => 'Way',
		'category' => 'snd-blocks-product',
		'icon' => 'editor-ol-rtl',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'mirror' => array(
				'type' => 'boolean',
				'default' => false
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Способ применения'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Тоник идеально подходит для подготовки кожи к следующим этапам ухода'
			),
			'stepPrefix' => array(
				'type' => 'string',
				'default' => 'Шаг'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'steps' => array(
				'type' => 'array',
				'default' => array(
					'Достаньте тонер-эссенцию из коробки и аккуратно снимите колпачок',
					'Наберите достаточное количество средства на руки',
					'Равномерно распределите его по массажным линиям лица и шеи',
					'Пройдитесь по лицу легкими похлопывающими движениями подушечек пальцев, чтобы помочь средству лучше впитаться',
					'После того как средство впитается, переходите к следующему этапу ухода'
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'you' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/you',
		'version' => '0.1.0',
		'title' => 'You',
		'category' => 'snd-blocks-frontpage',
		'icon' => 'images-alt',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'ВЫ + BOHICARE'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Снимайте, делитесь и вдохновляйте, отмечая @bohicare #bohicare'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => 'Подписаться',
					'url' => '',
					'target' => false
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'you-product-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/you-product-card',
		'version' => '0.1.0',
		'title' => 'You product card',
		'category' => 'snd-blocks-other',
		'icon' => 'format-image',
		'example' => array(
			
		),
		'parent' => array(
			'snd/you'
		),
		'attributes' => array(
			'anchor' => array(
				'type' => 'string'
			),
			'product' => array(
				'type' => 'object'
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'show' => true,
					'title' => '@profile',
					'url' => 'https://instagram.com',
					'target' => true
				)
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
