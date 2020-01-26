import { GO_TO, GO_BACK } from "./navigation.actiontype";

export const goTo = page => ({
  type: GO_TO,
  payload: { data: page }
});

export const goBack = () => ({
  type: GO_BACK
});
