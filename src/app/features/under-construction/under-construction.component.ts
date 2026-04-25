import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

interface MagicParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  r: number;
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
  @ViewChild('starsCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private particles: MagicParticle[] = [];
  private animationId = 0;
  private t = 0;

  private readonly STAR_COUNT = 120;
  private readonly PARTICLE_COLORS = ['180,130,255', '255,200,50', '122,255,234'];

  ngAfterViewInit(): void {
    this.initCanvas();
    this.spawnStars();
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

  private spawnStars(): void {
    const { width, height } = this.canvasRef.nativeElement;
    this.stars = Array.from({ length: this.STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));
  }

  private spawnParticle(): void {
    const { width } = this.canvasRef.nativeElement;
    const color = this.PARTICLE_COLORS[Math.floor(Math.random() * this.PARTICLE_COLORS.length)];
    this.particles.push({
      x: width * 0.35 + Math.random() * width * 0.1,
      y: window.innerHeight * 0.55 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 1 + 0.5),
      life: 1,
      decay: Math.random() * 0.01 + 0.005,
      r: Math.random() * 2 + 0.5,
      color,
    });
  }

  private animate = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const { width, height } = canvas;

    this.ctx.clearRect(0, 0, width, height);
    this.t += 0.016;

    // Draw twinkling stars
    for (const s of this.stars) {
      s.phase += s.speed;
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.phase));
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
      this.ctx.fill();
    }

    // Spawn magic particles occasionally
    if (Math.random() < 0.15) {
      this.spawnParticle();
    }

    // Draw and update magic particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color},${p.life * 0.7})`;
      this.ctx.fill();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  private readonly onResize = (): void => {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.spawnStars();
  };
}
