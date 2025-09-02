// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
    http.get(`*/users/me`, () => {
        return HttpResponse.json({
            user: {
                id: 1,
                name: "Ramon",
                email: "ramon@teste.com",
                role: 'ADMIN',
                imageUrl: null,
                availableHours: [],
            }
        });
    }),

    http.get(`*/calleds`, () => {
        return HttpResponse.json({
            calleds: [
                {
                    id: '1',
                    title: 'Teste Mock',
                    description: 'Testando',
                    status: 'OPEN',
                    createdAt: '2025-08-28T05:30:32.868Z',
                    updatedAt: '2025-08-28T05:30:32.868Z',
                    service: {
                        id: '1',
                        name: 'Serviço de teste',
                        price: 19,
                        status: 'INACTIVE',
                    },
                    client: {
                        id: '1',
                        name: 'Cliente da Silva',
                        email: 'client@test.com',
                        imageUrl: null,
                    },

                    technician: {
                        id: '1',
                        name: 'Técnico Oliveira',
                        email: 'tech@test.com',
                        imageUrl: null,
                    },

                    additionalServices: [
                        {
                            id: '1',
                            description: 'Descrição de teste',
                            price: 10,
                        }
                    ]

                }
            ]
        });
    }),

];
