import sgMail from "../config/sendgrid.js";

export const sendTestEmail = async (req, res) => {
    console.log("This is the backend code for the test email:", req.body);
    res.status(200).json({ message: 'Test email endpoint reached successfully.' });
};

export const sendEmail = async (req, res) => {
    const { name, email, company, budget, message, interestedIn } = req.body;

    if(!name || !email || !message) {
        return  res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    const msgToOwner = {
        to: process.env.TO_EMAIL,
        from: process.env.FROM_EMAIL,
        templateId: 'd-59eb05cd15c3483ab9fbcaca5097e799',    
        dynamic_template_data: {
            interestedIn: interestedIn || null,
            name,
            email,
            company: company || null,
            budget: budget || null,
            message,
        },
        replyTo: email,
    }

    const msgToUser = {
        to: email,
        from: process.env.FROM_EMAIL,
        templateId: 'd-e182766aff644445a14e0c85d8792626',
        dynamic_template_data: {
            interestedIn: interestedIn || null,
            name,
            email,
            company: company || null,
            budget: budget || null,
            message,
        },
        replyTo: process.env.FROM_EMAIL,
    }

    try {
        await sgMail.send(msgToOwner);
        await sgMail.send(msgToUser);
        res.status(200).json({ message: 'Emails sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send emails.' });
    }
};
