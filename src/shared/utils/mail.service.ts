import * as nodemailer from 'nodemailer';
import * as handlebars from "handlebars";
import * as fs from 'fs';

const CONFIG = {
    host: '',
    port: 465,
    secure: true,
    auth: {
        user: 'support@dhineu.com',
        pass: '&)cwV/)D=un?6n(T',
    }
};

export const sendMail = async (mailOptions: {
    from: string,
    to: string,
    subject: string,
    html: ReturnType<typeof readTemplateContent> | string
}, config?: {
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    }
}) => {
    try {
        config = config ?? CONFIG;
        const transporter = nodemailer.createTransport(config);
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export const readTemplateContent = (templateFilePath: string, data: unknown) => {
    // const templateFilePath = path.join(__dirname, `../templates/${templateName}.template.hbs`);
    const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateContent);
    return compiledTemplate(data);
}