import { useCallback, useEffect, useRef, useState } from 'react';
import { bindDialog, type DialogController } from './index.js';
export function useDialog(options: { dismissOutside?: boolean } = {}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const controller = useRef<DialogController | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dismissOutside = options.dismissOutside ?? true;
  useEffect(() => {
    const element = dialogRef.current;
    if (!element) return;
    const bound = bindDialog(element, { dismissOutside, onOpenChange: setIsOpen });
    controller.current = bound;
    return () => { bound.destroy(); controller.current = null; };
  }, [dismissOutside]);
  return {
    dialogRef, isOpen,
    open: useCallback(() => controller.current?.open(), []),
    close: useCallback((value?: string) => controller.current?.close(value), []),
  };
}
