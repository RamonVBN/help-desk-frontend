export interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'TECHNICIAN' | 'CLIENT'
    imageUrl: string
    availableHours: string[]
}