export interface DialogOptions {
  dismissOutside?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export interface DialogController { open(): void; close(value?: string): void; destroy(): void }
/** Bind a mounted, initially closed native dialog. No CSS or framework required. */
export function bindDialog(element: HTMLDialogElement, options: DialogOptions = {}): DialogController {
  if (typeof element.showModal !== 'function') throw new Error('Native modal dialog support is required');
  if (element.open) throw new Error('Bind an initially closed dialog');
  let previous: Element | null = null, isOpen = false, destroyed = false, outsideStart = false;
  const restore = () => {
    const target = previous as HTMLElement | null; previous = null;
    if (target?.isConnected && typeof target.focus === 'function') target.focus();
  };
  const notifyClosed = () => {
    if (!isOpen || element.open) return;
    isOpen = false; restore(); options.onOpenChange?.(false);
  };
  const close = (value?: string) => {
    if (destroyed || !element.open) return;
    element.close(value); notifyClosed();
  };
  const onCancel = (event: Event) => { event.preventDefault(); close(); };
  const outside = (event: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    return event.target === element && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  };
  const onPointerDown = (event: PointerEvent) => { outsideStart = event.button === 0 && outside(event); };
  const onPointerUp = (event: PointerEvent) => {
    if (outsideStart && outside(event) && options.dismissOutside !== false) close();
    outsideStart = false;
  };
  element.addEventListener('cancel', onCancel);
  element.addEventListener('close', notifyClosed);
  element.addEventListener('pointerdown', onPointerDown);
  element.addEventListener('pointerup', onPointerUp);
  return {
    open() {
      if (destroyed) throw new Error('Dialog controller has been destroyed');
      if (element.open) return;
      previous = element.ownerDocument.activeElement;
      element.showModal(); isOpen = true; options.onOpenChange?.(true);
    },
    close,
    destroy() {
      if (destroyed) return;
      element.removeEventListener('cancel', onCancel);
      element.removeEventListener('close', notifyClosed);
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointerup', onPointerUp);
      if (element.open) element.close();
      if (isOpen) { restore(); options.onOpenChange?.(false); }
      isOpen = false; destroyed = true;
    },
  };
}
