import Subscriber from "../models/subscriberModel.js";
import sgMail from "../config/sendgrid.js";

export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({isSubscribed: true});
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscribers" });
    }
};


export const subscribe = async (req, res) => {
    const {email} = req.body

    try {
        let subscriber = await Subscriber.findOne({ email });
        if (!subscriber) {
            const token = Subscriber.generateToken();
            subscriber = new Subscriber({ email, unsubscribeToken: token });
            await subscriber.save();
        } else {
            subscriber.isSubscribed = true;
            await subscriber.save();
            return res.status(200).json({ message: "You are already subscribed to our Newsletter. Thanks!" });
        }

        const SubscriberToOwner = {
            to: process.env.TO_EMAIL,
            from: process.env.FROM_EMAIL,
            templateId: 'd-6ef0b8aa7ce54166b5db932dffd0b19b',    
            dynamic_template_data: {
                email,
                unsubscribeToken: subscriber.unsubscribeToken,
            },
            replyTo: email,
        }

        const OwnerToSubscriber = {
            to: email,
            from: process.env.FROM_EMAIL,
            templateId: 'd-cc3d8b87a4774d649608c687da3bbc7e',
            dynamic_template_data: {
                email,
                unsubscribeToken: subscriber.unsubscribeToken,
                unsubscribeUrl: `${process.env.FRONTEND_URL}/unsubscribe/${subscriber.unsubscribeToken}`,
            },
            replyTo: process.env.FROM_EMAIL,
        }

        await sgMail.send(SubscriberToOwner);
        await sgMail.send(OwnerToSubscriber);

        res.status(201).json({ message: "Subscribed successfully!" });
    } catch (error) {
        res.status(500).json({ message: `Error subscribing: ${error.message}` });
    }
}

export const unsubscribe = async (req, res) => {
    const { token } = req.params;

    try {
        const subscriber = await Subscriber.findOne({ unsubscribeToken: token });
        if (!subscriber) {
            return res.status(404).json({ message: "Subscriber not found" });
        }

        subscriber.isSubscribed = false;
        await subscriber.save();

        res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (error) {
        res.status(500).json({ message: `Error unsubscribing: ${error.message}` });
    }
}


export const sendNewsletterService = async (req, res) => {

    const { savedBlog } = req.body;

    try {
        const subscribers = await Subscriber.find({ isSubscribed: true });
        const emails = subscribers.map((s) => s.email);
        const emailMessage = {
            to: emails,
            from: process.env.FROM_EMAIL,
            templateId: 'd-a0ac0dde31714da1b328cf3c32138e2b',
            dynamic_template_data: {
                title: savedBlog.title,
                linkToBlog: `${process.env.FRONTEND_URL}/blogs/${savedBlog._id}`,
            },
        };

        await sgMail.sendMultiple(emailMessage);
        res.status(200).json({ success: true, message: "Newsletter sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
