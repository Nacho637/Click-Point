"use client";

import { useEffect, useRef, type RefObject } from "react";

export type KeyState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

const INITIAL: KeyState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

function mapCode(code: string, pressed: boolean, state: KeyState) {
  switch (code) {
    case "KeyW":
    case "ArrowUp":
      state.forward = pressed;
      break;
    case "KeyS":
    case "ArrowDown":
      state.backward = pressed;
      break;
    case "KeyA":
    case "ArrowLeft":
      state.left = pressed;
      break;
    case "KeyD":
    case "ArrowRight":
      state.right = pressed;
      break;
    default:
      break;
  }
}

/** Physical key codes only — works on non-Latin layouts. */
export function useKeyboard(): RefObject<KeyState> {
  const keys = useRef<KeyState>({ ...INITIAL });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      mapCode(e.code, true, keys.current);
    };
    const up = (e: KeyboardEvent) => mapCode(e.code, false, keys.current);
    const blur = () => {
      keys.current = { ...INITIAL };
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  return keys;
}
