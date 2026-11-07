import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  signal,
  afterNextRender
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { Profile } from '../../core/models/portfolio.model';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly scrollService = inject(ScrollService);

  readonly profile: Profile = PORTFOLIO_DATA.profile;
  readonly projectsCount = PORTFOLIO_DATA.projects.length;
  readonly publicationsCount = PORTFOLIO_DATA.publications.length;

  @ViewChild('heroCanvas', { static: false })
  private canvasRef?: ElementRef<HTMLCanvasElement>;

  private animationFrameId: number | null = null;
  private particles: Particle[] = [];
  private mouse = { x: -9999, y: -9999 };
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private resizeHandler?: () => void;

  constructor() {
    afterNextRender(() => {
      this.initCanvas();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.isBrowser && this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  readonly cardTransform = signal<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  readonly glintPos = signal<{ x: number; y: number }>({ x: 50, y: 50 });
  readonly isHovered = signal<boolean>(false);

  onCardMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Fluid 3D perspective tilt
    const rotateX = Number((((y - centerY) / centerY) * -5).toFixed(2));
    const rotateY = Number((((x - centerX) / centerX) * 5).toFixed(2));
    this.cardTransform.set(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);

    // Holographic Specular Glint coordinate (percentages)
    const glintX = Math.round((x / rect.width) * 100);
    const glintY = Math.round((y / rect.height) * 100);
    this.glintPos.set({ x: glintX, y: glintY });
    this.isHovered.set(true);
  }

  onCardMouseLeave(): void {
    this.cardTransform.set('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    this.glintPos.set({ x: 50, y: 50 });
    this.isHovered.set(false);
  }

  onPhotoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && !img.src.includes('Pream%20infy.jpeg')) {
      img.src = 'Pream infy.jpeg';
    }
  }

  scrollTo(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.scrollService.scrollTo(sectionId);
  }

  onHeroMouseMove(event: MouseEvent): void {
    if (!this.canvasRef) return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  }

  onHeroMouseLeave(): void {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  // ==========================================
  // NEURAL NETWORK CANVAS ANIMATION
  // ==========================================
  private initCanvas(): void {
    if (!this.isBrowser || !this.canvasRef) return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.canvasCtx = ctx;

    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.createParticles(canvas.width, canvas.height);
    };

    setCanvasDimensions();
    this.resizeHandler = () => setCanvasDimensions();
    window.addEventListener('resize', this.resizeHandler);

    this.animateParticles();
  }

  private createParticles(width: number, height: number): void {
    const count = Math.min(Math.floor((width * height) / 22000), 55);
    const colors = ['rgba(99, 102, 241, 0.7)', 'rgba(56, 189, 248, 0.7)', 'rgba(168, 85, 247, 0.6)'];

    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  private animateParticles(): void {
    if (!this.canvasCtx || !this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = this.canvasCtx;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse proximity interaction
      const dxMouse = this.mouse.x - p.x;
      const dyMouse = this.mouse.y - p.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 120) {
        p.x -= (dxMouse / distMouse) * 0.8;
        p.y -= (dyMouse / distMouse) * 0.8;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 110) * 0.25;
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }
}
