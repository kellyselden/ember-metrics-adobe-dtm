export default function mockAdobeDTM({
  window = window,
  pageBottom = () => {},
  track = () => {}
}) {
  window._satellite = {
    initialized: true,
    setDebug: () => {},
    pageBottom,
    track,
    pending: []
  };
}

export function reset({
  window = window
}) {
  delete window._satellite;
}
