import { Alert } from 'react-native';
import Mailer from 'react-native-mail';

export const useEmail = (): any => {
    const sendEmail = ({ message }: { message: string}) => {
        console.log(message)
        Mailer.mail({
            subject: 'Report Bug',
            recipients: ['apprewardsdevs+support@gmail.com'],
            body: message,
            isHTML: true,
        }, (error, event) => {
            console.log(error, event)
            if (error) {
            Alert.alert('Error', 'Could not send mail. Please try again later.');
            }
        });
    };
    return [sendEmail];
}