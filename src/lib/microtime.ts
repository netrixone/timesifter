const BYTE_STREAM_PATTERN = /^[\da-f]{2}(?: [\da-f]{2}){0,7}$/i;
const BYTE_SEPARATOR_PATTERN = / /g;
const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/;

export {
    now,
    isISOString,
    isMicrotimeNumber,
    parseISOString,
    parseNumber,
    toISOString,
};

function now(): number {
    return Date.now() * 1000;
}

function isISOString(input: string) {
    if (!ISO_PATTERN.test(input)) {
        return false;
    }
    const inputNumber = Date.parse(input);
    return !Number.isNaN(inputNumber) && inputNumber >= 0;
}

function isMicrotimeNumber(input: string): boolean {
    if (input.includes(' ')) {
        if (!isMicrotimeByteStream(input)) {
            return false;
        }
        input = '0x' + input.replace(BYTE_SEPARATOR_PATTERN, '');
    }

    return isMicrotimeWord(input);
}

function parseISOString(input: string): number {
    let millis = Date.parse(input) * 1000;

    const matchRes = input.match(ISO_PATTERN);
    if (matchRes && matchRes.length === 2 && matchRes[1]) {
        const fixedDecimals = matchRes[1]
            .substring(1)
            .padEnd(6, '0');

        const micros = Number(fixedDecimals.substring(3));
        millis += micros;
    }

    return millis;
}

function parseNumber(input: string): number {
    let inputNumber;

    if (input.includes(' ')) {
        inputNumber = Number('0x' + input.replace(BYTE_SEPARATOR_PATTERN, ''));
    } else {
        inputNumber = Number(input);
    }

    return inputNumber;
}

function toISOString(micros: number): string {
    const millis = micros / 1000;
    return new Date(millis)
        .toISOString()
        .replace('Z', String(micros % 1000).padStart(3, '0') + 'Z');
}

function isMicrotimeByteStream(input: string): boolean {
    return BYTE_STREAM_PATTERN.test(input);
}

function isMicrotimeWord(input: string): boolean {
    const inputNumber = Number(input);
    if (isNaN(inputNumber)) {
        return false;
    }

    return inputNumber >= 0;
}
