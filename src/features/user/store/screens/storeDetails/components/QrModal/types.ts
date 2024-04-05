export interface QrModalProps {
    additionalInfo?: string;
    qrCodeContent: string;
    isVisible: boolean;
    onHide: ()=> void;
}