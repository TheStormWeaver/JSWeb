import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  exportAs: "appHighlight",
})
export class HighlightDirective {

  @HostBinding("style.color") color = "black";

  @Input() set appHighlight(isActive: boolean){
    if(isActive){
      this.color = "red"
    }else {
      this.color = "black"
    }
  }


  /*
  @Input() isActive!: boolean


  constructor(private elementRef: ElementRef) { }

  ngOnChanges() {
    if(this.isActive) {
      this.elementRef.nativeElement.style.color = "red"
    }else {
      this.elementRef.nativeElement.style.color = "black"
    }
  }
  */
}
