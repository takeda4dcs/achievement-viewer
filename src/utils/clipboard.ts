export const copyTextToClipboard = async (text: string, callback?: () => void) => {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
      if (callback) {
        callback();
      }
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    },
  );
};
