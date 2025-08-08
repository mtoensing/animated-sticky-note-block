<?php
// This file is generated. Do not modify it manually.
return array(
	'noteblock' => array(
		'apiVersion' => 2,
		'name' => 'create-block/noteblock',
		'title' => 'NoteBlock',
		'category' => 'widgets',
		'icon' => 'sticky',
		'description' => 'Leave sticky notes directly on your website using a simple Gutenberg block.',
		'supports' => array(
			'html' => false,
			'align' => true
		),
		'attributes' => array(
			'content' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'p'
			),
			'textAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#fff9c4'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'noteblock',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
