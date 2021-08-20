<?php

function walkTree($tree, $options)
{
	function visit($node, $parent, $index, $options)
	{

		// 进入此节点
		$options->enter && ($options->enter)($node, $parent, $index);

		// 访问子节点的入口属性
		$options->childrenProp = $options->childrenProp ?? 'children';

		$childrenProp = $options->childrenProp;

		if (is_array($node->$childrenProp)) {
			foreach ($node->$childrenProp as $node_key => $node_val) {
				visit($node_val, $node, $node_key, $options);
			}
		}

		// 离开此节点
		$options->leave && ($options->leave)($node, $parent, $index);
	};

	foreach ($tree as $tree_key => $tree_val) {
		visit($tree_val, null, $tree_key, $options);
	}
}

$json = '[
    {
        "id": 1,
        "label": "label-花莲县",
        "children": [
            {
                "id": 1000,
                "label": "label-澳门半岛"
            }
        ]
    },
    {
        "id": 2,
        "label": "label-上海市",
        "children": [
            {
                "id": 1001,
                "label": "label-咸宁市"
            },
            {
                "id": 1002,
                "label": "label-扬州市"
            }
        ]
    },
    {
        "id": 3,
        "label": "label-抚顺市",
        "children": [
            {
                "id": 1003,
                "label": "label-鄂州市"
            },
            {
                "id": 1004,
                "label": "label-阳泉市"
            }
        ]
    },
    {
        "id": 4,
        "label": "label-抚顺市",
        "children": [
            {
                "id": 1005,
                "label": "label-襄阳市"
            },
            {
                "id": 1006,
                "label": "label-台中市"
            }
        ]
    },
    {
        "id": 5,
        "label": "label-保定市",
        "children": [
            {
                "id": 1007,
                "label": "label-巢湖市"
            },
            {
                "id": 1008,
                "label": "label-株洲市"
            }
        ]
    },
    {
        "id": 6,
        "label": "label-吉林市",
        "children": [
            {
                "id": 1009,
                "label": "label-银川市"
            },
            {
                "id": 1010,
                "label": "label-台东县"
            }
        ]
    }
]';

$php_json = json_decode($json);


walkTree($php_json, (object)[
	'childrenProp' => 'children',
	'enter' => function ($node) {
		var_dump($node->label);	
	}
]);
