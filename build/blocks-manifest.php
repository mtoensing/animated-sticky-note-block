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
			'align' => true,
			'typography' => array(
				'fontFamily' => true,
				'fontSize' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			)
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
			)
		),
		'textdomain' => 'noteblock',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
