import { interviewService } from "../src/services/interview.service";

const interviewHandler = {

    async handleGenerateQuestion(form, {
        setStatus,
        setStatusMessage,
        measureBox,
        onSuccess,

        logout,
        successMessage = 'Questions ready!',
        successDelay = 1500,
        errorDelay = 4000,
    }) {
        
        measureBox?.();
        setStatus('loading');

        try {
            const response = await interviewService.generateInterview(form);

            setStatus('success');
            setStatusMessage(successMessage);

            setTimeout(() => {
                onSuccess?.(response);
            }, successDelay);

            return response;

        } catch (error) {
          
            if (error.response?.status === 401) {
                setStatus('idle');
                logout?.();
                throw error;
            }

            const message = error.response?.data?.message || error.message || 'Could not generate questions. Please try again.';
            setStatus('error');
            setStatusMessage(message);

            setTimeout(() => {
                setStatus('idle');
            
            }, errorDelay);

            throw error;
        }
    }
};

export default interviewHandler;