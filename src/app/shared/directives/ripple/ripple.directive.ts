import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[ripple]',
})
export class RippleDirective {
  private element = inject(ElementRef);

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {

    const host = this.element.nativeElement;
    const rect = host.getBoundingClientRect();

    host.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`);
    host.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`);

    host.classList.remove('ripple-active');
    void host.offsetWidth;
    host.classList.add('ripple-active');
  }
}