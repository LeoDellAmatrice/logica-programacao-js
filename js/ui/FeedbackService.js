export function FeedbackService(toast, header) {

  function show(text, type = "info") {
    toast.show(text, type);
    header.setStatus(type);
  }

  return { show };
}
