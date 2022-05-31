<?php

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\OpenApi;
use ApiPlatform\Core\OpenApi\Model;

class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(OpenApiFactoryInterface $decorate)
    {
        $this->decorate = $decorate;
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorate->__invoke($context);
        $schemas = $openApi->getComponents()->getSecuritySchemes();
        $schemas['bearerAuth'] = [
            'type' => 'http',
            'scheme' => 'bearer',
            'bearerFormat' => 'JWT',
            'description' => 'JWT Authorization header using the Bearer scheme.',
        ];
        return $openApi;
    }
}
