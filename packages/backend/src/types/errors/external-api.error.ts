import { EXTERNAL_SERVICE_NAME } from "@ensol-test/shared";

export class ExternalApiError extends Error {
    public serviceName: string;
    public details?: Record<string, unknown>;
    constructor(serviceName: EXTERNAL_SERVICE_NAME, message: string, details?: Record<string, unknown>) {
        super(message);
        this.name = 'ExternalApiError';
        this.serviceName = serviceName;
        this.details = details;
    }
}