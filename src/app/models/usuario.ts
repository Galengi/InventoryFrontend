import { MatOptionSelectionChange } from "@angular/material/core";

export interface Usuario {
    email: string;
    token: string;
}

export function initUsuario(options?: Partial<Usuario>): Usuario{
    const defaults = {
        email:'',
        token:'',
    };
    return{
        ...defaults,
        ...options,
    }
}