export type BarcodeType = 'GTIN-12' | 'GTIN-13' | 'GTIN-14' | 'GSIN' | 'SSCC';
export type BarcodeTypeDigits = {
    [key in BarcodeType]: number;
};
export type BarcodeTypeSplits = {
    [key in BarcodeType]?: RegExp;
};
export declare const barcodeDigits: BarcodeTypeDigits;
export declare const barcodeSplits: BarcodeTypeSplits;
export declare const couldBeGTIN: (gtin: string) => boolean;
export declare function trimUPC(digits: string): string;
export declare function parseCheckDigit(str: string, format?: BarcodeType): string;
export declare function parseUPCA(upc: string): string;
export declare function parseGTINFormat(str: string): BarcodeType | null;
export declare function formatGTIN(upc: string, raw?: boolean): string;
