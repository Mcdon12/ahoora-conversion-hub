
// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// GTM event types
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

export interface CTAClickEvent extends GTMEvent {
  event: 'cta_click';
  cta_text: string;
  cta_location: string;
}

export interface SignupSuccessEvent extends GTMEvent {
  event: 'signup_success';
  user_type: string;
  user_email_domain: string;
}

export interface LoginSuccessEvent extends GTMEvent {
  event: 'login_success';
  user_email_domain: string;
}

export interface FormSubmitEvent extends GTMEvent {
  event: 'form_submit';
  form_name: string;
  question_text?: string;
}

export interface SocialClickEvent extends GTMEvent {
  event: 'social_click';
  social_platform: string;
}

export interface PageViewEvent extends GTMEvent {
  event: 'page_view';
  page_title: string;
  page_path: string;
}

export interface SampleQuestionEvent extends GTMEvent {
  event: 'sample_question_click';
  question_text: string;
}

// Helper function to push events to dataLayer
export const pushGTMEvent = (event: GTMEvent): void => {
  if (window.dataLayer) {
    window.dataLayer.push(event);
  }
};
