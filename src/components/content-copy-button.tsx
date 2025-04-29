import { MdContentCopy, MdCheck } from "react-icons/md";
import { copyTextToClipboard } from "../utils/clipboard";
import React from "react";

export interface ContentCopyButtonProps {
  text: string;
  children?: React.ReactNode;
}

const copyTextToClipboardEffect = (elm: HTMLElement, text: string) =>
  copyTextToClipboard(text, () => {
    const clipboardIcon = elm.querySelector("span:has(.before_copy)")!;
    const checkIcon = elm.querySelector("span:has(.after_copy)")!;
    clipboardIcon.setAttribute("hidden", "true");
    checkIcon.removeAttribute("hidden");
    setTimeout(() => {
      clipboardIcon.removeAttribute("hidden");
      checkIcon.setAttribute("hidden", "true");
    }, 1000);
  });

const ContentCopyButton = React.forwardRef<HTMLButtonElement, ContentCopyButtonProps>(({ text, children }) => {
  return (
    <>
      <button
        className="align-middle"
        onClick={(e) => {
          copyTextToClipboardEffect(e.currentTarget, text);
          e.stopPropagation();
        }}
      >
        {children}
        <span className="inline-block w-1"></span>
        <span>
          <MdContentCopy className="before_copy inline" />
        </span>
        <span hidden>
          <MdCheck className="after_copy inline hidden" />
        </span>
      </button>
    </>
  );
});
ContentCopyButton.displayName = "ContentCopyButton";

export { ContentCopyButton };
