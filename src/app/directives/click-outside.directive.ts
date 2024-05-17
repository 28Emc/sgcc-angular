import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any): void {
    console.log('target', target)
    const clickedInside = this.elementRef.nativeElement.contains(target);
    console.log('clickedInside', clickedInside)
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

  /* @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    console.log('event', event)
    console.log('targetElement', targetElement)
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    console.log('clickedInside', clickedInside)
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  } */

}
