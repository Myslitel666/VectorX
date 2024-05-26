export interface IFeedbackMessage {
    feedbackMessage: string;
    isError: boolean;
}

export class FeedbackMessage implements IFeedbackMessage {
    feedbackMessage: string;
    isError: boolean;

    constructor(feedbackMessage: string, isError: boolean) {
        this.feedbackMessage = feedbackMessage;
        this.isError = isError;
    }
}