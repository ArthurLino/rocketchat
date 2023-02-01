import tw from "tailwind-styled-components";

export type MessageProps = {
  isSended: boolean;
  content: string;
  senderName: string;
  timeStamp: string;
};

type MessageContainerProps = {
  $received: boolean;
};

const MessageContainer = tw.div`
    py-3
    px-4
    text-lg  
    break-words
    ${(props: MessageContainerProps) =>
      props.$received
        ? "rounded-r-lg rounded-bl-lg bg-sky-600"
        : "rounded-l-lg rounded-br-lg bg-blue-700"}
    
`;

const StyledMessage = tw.div`
    max-w-[75%]
    ${(props: MessageContainerProps) =>
      props.$received ? "self-start" : "self-end"}

`;

export function Message({
  senderName,
  isSended,
  content,
  timeStamp,
}: MessageProps) {
  return (
    <StyledMessage $received={!isSended}>
      <span className="text-base text-white/70">
        {senderName} - {timeStamp}
      </span>
      <MessageContainer $received={!isSended}>
        <p>{content}</p>
      </MessageContainer>
    </StyledMessage>
  );
}
