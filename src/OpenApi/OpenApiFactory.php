<?php 

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\OpenApi;
use ApiPlatform\Core\OpenApi\Model;

class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorate)
    {
        $this->decorate = $decorate;
    }
    
    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorate->__invoke($context);

        $schemas=$openApi->getComponents()->getSecuritySchemes();
        //bearer Auth
        $schemas['bearerAuth'] = [
            'type' => 'http',
            'scheme' => 'bearer',
            'bearerFormat' => 'JWT',
        ];
        
        // save the modified openapi
        $openApi->withComponents(new Model\Components($schemas));
        return $openApi;
    }
}