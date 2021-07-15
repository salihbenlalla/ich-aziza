import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface NavBarProps {
  children: ReactNode;
}

export type CardTypeProps = 'sign-up' | 'sign-in' | 'reset-password';

export interface SetCurrentCardProp {
  setCurrentCard: Dispatch<SetStateAction<CardTypeProps>>;
}
