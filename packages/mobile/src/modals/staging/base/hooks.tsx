import React, { useContext } from "react";

export interface ModalStateContext {
  readonly key: string;
  readonly isTransitionOpening: boolean;
  readonly isTransitionClosing: boolean;

  readonly align?: "top" | "center" | "bottom";
  readonly isOpen: boolean;
  readonly transitionVelocity?: number;
  readonly openTransitionVelocity?: number;
  readonly closeTransitionVelocity?: number;
  readonly disableBackdrop?: boolean;
  readonly disableClosingOnBackdropPress?: boolean;

  readonly close: () => void;
}

export const ModalContext = React.createContext<ModalStateContext | null>(null);

export const useModalState = () => {
  const state = useContext(ModalContext);
  if (!state) {
    throw new Error("You forgot to use ModalProvider");
  }

  return state;
};