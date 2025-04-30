"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
        name: 'strapi::cors',
        config: {
            enabled: true,
            origin: (ctx) => {
                // Get the request origin from the header
                const requestOrigin = ctx.request.header.origin;
                // Allow specific origins
                const allowedOrigins = [
                    'https://foreverfadedmke.com',
                    'http://localhost:3000',
                    'https://harmonious-luck-fd75090c58.strapiapp.com',
                ];
                // Check if the request origin matches any of the allowed origins
                if (allowedOrigins.includes(requestOrigin)) {
                    return requestOrigin;
                }
                // Also allow any subdomain of foreverfadedmke.com
                if (requestOrigin === null || requestOrigin === void 0 ? void 0 : requestOrigin.includes('foreverfadedmke.com')) {
                    return requestOrigin;
                }
                // Also allow any strapiapp.com domain
                if (requestOrigin === null || requestOrigin === void 0 ? void 0 : requestOrigin.includes('strapiapp.com')) {
                    return requestOrigin;
                }
                // Also allow vercel preview deployments
                if (requestOrigin === null || requestOrigin === void 0 ? void 0 : requestOrigin.includes('-vande012s-projects.vercel.app')) {
                    return requestOrigin;
                }
                // Default to false if none of the above conditions match
                return false;
            },
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
            headers: [
                '*',
                'Cache-Control',
                'Content-Type',
                'Authorization',
                'X-Frame-Options',
                'If-None-Match'
            ],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
            credentials: true,
            keepHeaderOnError: true,
        },
    },
    {
        name: 'strapi::poweredBy',
        config: { poweredBy: 'Forever Faded API' }
    },
    {
        name: 'strapi::query',
        config: {
            cache: {
                enabled: true,
                maxAge: 3600000, // 1 hour in milliseconds
            }
        }
    },
    {
        name: 'strapi::body',
        config: {
            jsonLimit: '10mb',
        }
    },
    {
        name: 'strapi::session',
        config: {
            maxAge: 86400000, // 24 hours in milliseconds
        }
    },
    'strapi::favicon',
    {
        name: 'strapi::public',
        config: {
            maxAge: 31536000, // 1 year in seconds
            defaultIndex: false
        }
    },
];
