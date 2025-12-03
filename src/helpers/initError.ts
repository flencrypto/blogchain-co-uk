const DEFAULT_INITIALIZATION_ERROR =
        'An unexpected error prevented Blogchain from starting. Please retry or reload the page.';

export function formatInitError(error: unknown): string {
        if (error instanceof Error) {
                return error.message || DEFAULT_INITIALIZATION_ERROR;
        }

        if (typeof error === 'string') {
                return error.trim() || DEFAULT_INITIALIZATION_ERROR;
        }

        if (typeof error === 'object' && error !== null) {
                try {
                        const serialised = JSON.stringify(error);
                        return serialised === '{}' ? DEFAULT_INITIALIZATION_ERROR : serialised;
                } catch (serialisationError) {
                        // eslint-disable-next-line no-console
                        console.error('Failed to serialise initialization error', serialisationError);
                        return DEFAULT_INITIALIZATION_ERROR;
                }
        }

        return DEFAULT_INITIALIZATION_ERROR;
}
