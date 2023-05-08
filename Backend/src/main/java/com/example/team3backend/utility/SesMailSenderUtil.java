package com.example.team3backend.utility;
// snippet-comment:[These are tags for the AWS doc team's sample catalog. Do not remove.]
// snippet-sourcedescription:[SendMessage.java demonstrates how to send an email message by using the Amazon Simple Email Service (Amazon SES).]
// snippet-keyword:[AWS SDK for Java v2]
// snippet-keyword:[Amazon Simple Email Service]

// snippet-start:[ses.java2.sendmessage.complete]

// snippet-start:[ses.java2.sendmessage.import]
import com.example.team3backend.configuration.ClientConfiguration;
import com.example.team3backend.constants.Enums;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Properties;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.ses.model.SendRawEmailRequest;
import software.amazon.awssdk.services.ses.model.RawMessage;
import software.amazon.awssdk.services.ses.model.SesException;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
// snippet-end:[ses.java2.sendmessage.import]

@Service
@Slf4j
public class SesMailSenderUtil {
    @Autowired
    private ClientConfiguration clientConfiguration;

    public void mailSender(String recipient, String bookingId) throws IOException {

        // The HTML body of the email.
        String bodyHTML = String.format(Enums.SesEnum.HTML_BODY.getValue(),bookingId);

        try {
            send(clientConfiguration.getSesManagerClient(), Enums.RatingsEnum.SENDER_EMAIL.getValue(), recipient, Enums.RatingsEnum.EMAIL_SUBJECT.getValue(), bodyHTML);

        } catch (IOException | MessagingException e) {
            throw new IOException (e.getMessage());
        }
    }

    // snippet-start:[ses.java2.sendmessage.main]
    public  void send(SesClient client,
                            String sender,
                            String recipient,
                            String subject,
                            String bodyHTML
    ) throws MessagingException, IOException {

        Session session = Session.getDefaultInstance(new Properties());
        MimeMessage message = new MimeMessage(session);

        // Add subject, from and to lines.
        message.setSubject(subject, Enums.SesEnum.UTF_8.getValue());
        message.setFrom(new InternetAddress(sender));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));

        // Create a multipart/alternative child container.
        MimeMultipart msgBody = new MimeMultipart(Enums.SesEnum.ALTERNATIVE.getValue());

        // Create a wrapper for the HTML and text parts.
        MimeBodyPart wrap = new MimeBodyPart();

        // Define the text part.

        // Define the HTML part.
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(bodyHTML, Enums.SesEnum.CONTENT_HTML.getValue());

        // Add the text and HTML parts to the child container.
        msgBody.addBodyPart(htmlPart);

        // Add the child container to the wrapper object.
        wrap.setContent(msgBody);

        // Create a multipart/mixed parent container.
        MimeMultipart msg = new MimeMultipart(Enums.SesEnum.MIXED.getValue());

        // Add the parent container to the message.
        message.setContent(msg);

        // Add the multipart/alternative part to the message.
        msg.addBodyPart(wrap);

        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            message.writeTo(outputStream);
            ByteBuffer buf = ByteBuffer.wrap(outputStream.toByteArray());

            byte[] arr = new byte[buf.remaining()];
            buf.get(arr);

            SdkBytes data = SdkBytes.fromByteArray(arr);
            RawMessage rawMessage = RawMessage.builder()
                    .data(data)
                    .build();

            SendRawEmailRequest rawEmailRequest = SendRawEmailRequest.builder()
                    .rawMessage(rawMessage)
                    .overrideConfiguration(clientConfiguration.getAwsRequestOverrideConfiguration())
                    .build();

            client.sendRawEmail(rawEmailRequest);
            log.info(Enums.SesEnum.EMAIL_SENT.getValue()+" "+recipient);

        } catch (SesException e) {
            throw new MessagingException(e.getMessage());
        }
    }
    // snippet-end:[ses.java2.sendmessage.main]
}
// snippet-end:[ses.java2.sendmessage.complete]
