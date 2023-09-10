type MessageType = 
  | { type: 'text'; content: string }
  | { type: 'image'; content: string }  // URL of the image
  | { type: 'voice'; content: string }; // URL of the voice clip

type Message = {
  id: string;
  userId: string;   // to determine which user sent the message
  message: MessageType;
};

type ChatProps = {
  title: string;
  avatar?: string;   // URL of the avatar
  accentColor?: string;
  direction?: 'rtl' | 'ltr';  // default will be 'ltr'
};