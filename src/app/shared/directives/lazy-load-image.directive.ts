import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]',
})
export class LazyLoadImageDirective implements OnInit {
  @Input() appLazyLoad: string = '';
  @Input() placeholder: string =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e0e0e0" width="400" height="300"/%3E%3C/svg%3E';

  private intersectionObserver?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.setupLazyLoading();
  }

  private setupLazyLoading(): void {
    // Set placeholder
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.placeholder);

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadImage();
              this.intersectionObserver?.unobserve(this.el.nativeElement);
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before image enters viewport
        },
      );

      this.intersectionObserver.observe(this.el.nativeElement);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      this.loadImage();
    }
  }

  private loadImage(): void {
    const img = this.el.nativeElement;

    // Add loading class
    this.renderer.addClass(img, 'loading');

    // Create new image to preload
    const tempImg = new Image();

    tempImg.onload = () => {
      this.renderer.setAttribute(img, 'src', this.appLazyLoad);
      this.renderer.removeClass(img, 'loading');
      this.renderer.addClass(img, 'loaded');
    };

    tempImg.onerror = () => {
      this.renderer.removeClass(img, 'loading');
      this.renderer.addClass(img, 'error');
      console.error(`Failed to load image: ${this.appLazyLoad}`);
    };

    tempImg.src = this.appLazyLoad;
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
