import { formatInitError } from '@/helpers/initError';

describe('formatInitError', () => {
        it('returns the message from an Error instance', () => {
                const error = new Error('failed to connect');

                expect(formatInitError(error)).toBe('failed to connect');
        });

        it('returns the provided string message', () => {
                expect(formatInitError('custom failure')).toBe('custom failure');
        });

        it('serialises plain objects to provide context', () => {
                expect(formatInitError({ reason: 'timeout', code: 504 })).toBe('{"reason":"timeout","code":504}');
        });

        it('falls back to a friendly default when given unusable input', () => {
                expect(formatInitError(undefined)).toBe(
                        'An unexpected error prevented Blogchain from starting. Please retry or reload the page.',
                );
        });
});
