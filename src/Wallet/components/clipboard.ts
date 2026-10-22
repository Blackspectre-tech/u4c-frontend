import { response_message } from "@/components/utilities/utils";

// Shared by every screen that needs a "copy to clipboard" button (Receive,
// History, the onramp result panel).
export const copy_to_clipboard = async (value: string) => {
  const scc_msg = "Address copied.";
  const err_msg = "Something went wrong.";

  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      response_message({ message: scc_msg, option: "scc" });
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      response_message({ message: err_msg, option: "wrn" });
    }
    document.body.removeChild(textArea);
    return;
  }

  navigator.clipboard.writeText(value).then(
    () => response_message({ message: scc_msg, option: "scc" }),
    () => response_message({ message: err_msg, option: "wrn" }),
  );
};
