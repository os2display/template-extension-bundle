<?php

namespace Itk\TemplateExtensionBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * Get theme colors.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function themeColorsAction()
    {
        return new JsonResponse(
            [
                'text' => [
                    (object)[
                        'text' => "Black",
                        'value' => "#333",
                    ],
                    (object)[
                        'text' => "60% Black",
                        'value' => "#858585",
                    ],
                    (object)[
                        'text' => "White",
                        'value' => "#fff",
                    ]
                ],
                'main' => [
                    (object)[
                        'text' => 'Pink',
                        'value' => '#EF0043'
                    ],
                    (object)[
                        'text' => '30% Pink',
                        'value' => '#FAB2C6'
                    ],
                    (object)[
                        'text' => 'Purple',
                        'value' => '#673BB7'
                    ],
                    (object)[
                        'text' => '30% Purple',
                        'value' => '#D2C3EA'
                    ],
                    (object)[
                        'text' => 'Dark blue',
                        'value' => '#2A3CA2'
                    ],
                    (object)[
                        'text' => '30% Dark blue',
                        'value' => '#BFC4E4'
                    ],
                    (object)[
                        'text' => 'Blue',
                        'value' => '#3761D9'
                    ],
                    (object)[
                        'text' => '30% Blue',
                        'value' => '#C2D0F3'
                    ],
                    (object)[
                        'text' => 'Petroleum',
                        'value' => '#008488'
                    ],
                    (object)[
                        'text' => '30% Petroleum',
                        'value' => '#B2DADA'
                    ],
                    (object)[
                        'text' => 'Green',
                        'value' => '#008850'
                    ],
                    (object)[
                        'text' => '30% Green',
                        'value' => '#B2DBC9'
                    ],
                    (object)[
                        'text' => 'Yellow',
                        'value' => '#FEE13D'
                    ],
                    (object)[
                        'text' => '30% Yellow',
                        'value' => '#FFF6C5'
                    ],
                    (object)[
                        'text' => 'Orange',
                        'value' => '#FF5F31'
                    ],
                    (object)[
                        'text' => '30% Orange',
                        'value' => '#FFCFC1'
                    ],
                    (object)[
                        'text' => 'Red',
                        'value' => '#D32F2E'
                    ],
                    (object)[
                        'text' => '30% Red',
                        'value' => '#F2C0BF'
                    ],
                    (object)[
                        'text' => 'Light gray',
                        'value' => '#f6f6f6'
                    ],
                    (object)[
                        'text' => 'White',
                        'value' => '#fff'
                    ],
                    (object)[
                        'text' => 'Black',
                        'value' => '#333'
                    ],
                ]
            ]
        );
    }
}
