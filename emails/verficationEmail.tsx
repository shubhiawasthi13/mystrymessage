import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text, 
    Button
} from '@react-email/components';

interface verficationProps{
    username: string,
    otp: string
}

export default function VerficationEmail({username, otp}:verficationProps){
    return(
       <Html lang='en' dir='ltr'>
        <Head>
         <title>Verfication Code</title>
        </Head>
        <Preview>Here&apos;s your verfication code: {otp} </Preview>
        <Section>
            <Row>
                <Heading as ="h2">Hello {username},</Heading>
            </Row>
            <Row>
                <Text>
                    Thank you for registering, Please use the 
                    following verfication 
                    code to complete your registration:
                </Text> 
            </Row>
            <Row>
                <Text> {otp} </Text>
            </Row>
            <Row>
                <Text>
                    If you did not request for this code, Please ignore this email.
                </Text>
            </Row>
        </Section>
       </Html>
    )

}