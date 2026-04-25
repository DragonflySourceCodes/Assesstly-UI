import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

@Component({
  selector: 'app-under-construction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss',
})
export class UnderConstructionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId = 0;

  private readonly PARTICLE_COUNT = 80;
  private readonly COLORS = ['#ff8c00', '#e65100', '#e53935', '#ffd600'];

  ngAfterViewInit(): void {
    this.initCanvas();
    this.spawnParticles();
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
  }

  private spawnParticles(): void {
    const { width, height } = this.canvasRef.nativeElement;
    this.particles = Array.from({ length: this.PARTICLE_COUNT }, () =>
      this.createParticle(width, height)
    );
  }

  private createParticle(w: number, h: number): Particle {
    const color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      color,
    };
  }

  private animate = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const { width, height } = canvas;

    this.ctx.clearRect(0, 0, width, height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
      this.ctx.fill();
    }

    this.drawConnections(width, height);

    this.animationId = requestAnimationFrame(this.animate);
  };

  private drawConnections(w: number, h: number): void {
    const maxDist = 120;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  private readonly onResize = (): void => {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.spawnParticles();
  };
}
