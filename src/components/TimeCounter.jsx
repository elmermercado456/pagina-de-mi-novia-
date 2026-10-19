import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Sparkles } from 'lucide-react';
import { LOVE_DATA } from '../data/content';

// Función para sumar meses sin desbordamientos de días (ej. 31 de enero -> 28/29 de feb)
function addMonthsClamped(date, months) {
  const d = new Date(date);
  const originalDay = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const maxDaysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(originalDay, maxDaysInMonth));
  return d;
}

// Función segura para parsear fechas locales sin ambigüedad de zona horaria en iOS/Safari/Android
function parseLocalDate(dateInput) {
  if (dateInput instanceof Date) return dateInput;
  if (typeof dateInput === 'string') {
    const parts = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2}))?/);
    if (parts) {
      return new Date(
        Number(parts[1]),
        Number(parts[2]) - 1,
        Number(parts[3]),
        Number(parts[4] || 0),
        Number(parts[5] || 0),
        Number(parts[6] || 0)
      );
    }
  }
  return new Date(dateInput);
}

// Cálculo exacto del tiempo transcurrido en Meses, Días, Horas, Minutos y Segundos
function getExactTimeElapsed(startDateStr, now = new Date()) {
  const start = parseLocalDate(startDateStr);
  if (isNaN(start.getTime()) || now < start) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0, nextAnniversaryDays: 0 };
  }

  const totalMs = now.getTime() - start.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  // Estimación de meses transcurridos
  let years = now.getFullYear() - start.getFullYear();
  let months = (now.getMonth() - start.getMonth()) + years * 12;

  let anchor = addMonthsClamped(start, months);

  // Ajuste si la fecha objetivo aún no llega en este mes
  while (anchor > now && months > 0) {
    months--;
    anchor = addMonthsClamped(start, months);
  }

  // Tiempo remanente a partir del último mes cumplido
  const remainderMs = Math.max(0, now.getTime() - anchor.getTime());
  const days = Math.floor(remainderMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainderMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainderMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainderMs % (1000 * 60)) / 1000);

  // Próximo cumplemés
  const nextMonthDate = addMonthsClamped(start, months + 1);
  const msToNext = Math.max(0, nextMonthDate.getTime() - now.getTime());
  const nextAnniversaryDays = Math.ceil(msToNext / (1000 * 60 * 60 * 24));

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    nextAnniversaryDays,
  };
}

export default function TimeCounter() {
  const [timeElapsed, setTimeElapsed] = useState(() => getExactTimeElapsed(LOVE_DATA.startDate));

  useEffect(() => {
    // Si existía un valor en caché previo en localStorage, limpiarlo
    localStorage.removeItem('elmer_abigail_start_date');

    const update = () => {
      setTimeElapsed(getExactTimeElapsed(LOVE_DATA.startDate));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      label: 'Meses',
      value: timeElapsed.months,
      subtitle: 'de amor y complicidad',
      glow: 'from-rosewood-500/25 to-rosewood-600/10',
      badge: 'Meses',
      highlight: true,
    },
    {
      label: 'Días',
      value: timeElapsed.days,
      subtitle: 'caminando de la mano',
      glow: 'from-champagne-400/20 to-champagne-500/5',
      badge: 'Días',
    },
    {
      label: 'Horas',
      value: timeElapsed.hours,
      subtitle: 'escuchando tu voz',
      glow: 'from-rosewood-400/20 to-rosewood-500/5',
      badge: 'Horas',
    },
    {
      label: 'Minutos',
      value: timeElapsed.minutes,
      subtitle: 'de miradas cómplices',
      glow: 'from-champagne-300/20 to-champagne-400/5',
      badge: 'Min',
    },
    {
      label: 'Segundos',
      value: timeElapsed.seconds,
      subtitle: 'de certeza infinita',
      glow: 'from-rosewood-500/20 to-rosewood-600/5',
      badge: 'Seg',
      isLastOnMobile: true,
    },
  ];

  return (
    <section id="tiempo" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rosewood-500/10 border border-rosewood-500/20 text-rosewood-300 text-xs uppercase tracking-widest mb-3"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Nuestra Línea de Tiempo Exacta</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-3xl sm:text-5xl font-light text-white mb-4"
          >
            Cada Latido a tu Lado Cuenta
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base font-light"
          >
            El tiempo deja de ser una medida fría cuando se vive contigo: aquí se convierte en música,
            risas y la certeza de haber encontrado mi lugar en el mundo.
          </motion.p>
        </div>

        {/* 5 Real-time Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 mb-10">
          {statCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`glass-card glass-card-hover p-5 sm:p-6 rounded-2xl relative overflow-hidden text-center group border border-white/[0.08] ${
                card.isLastOnMobile ? 'col-span-2 sm:col-span-1' : ''
              } ${card.highlight ? 'ring-1 ring-champagne-400/30' : ''}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${card.glow} opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col items-center">
                {card.highlight && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-champagne-300 bg-champagne-400/10 px-2 py-0.5 rounded-full mb-1">
                    <Sparkles className="w-2.5 h-2.5 text-champagne-300" />
                    Cumplemés
                  </span>
                )}

                <span className="font-serif text-4xl sm:text-5xl lg:text-5xl font-normal text-white group-hover:text-champagne-200 transition-colors tracking-tight font-mono">
                  {String(card.value).padStart(2, '0')}
                </span>

                <h3 className="text-xs uppercase tracking-widest text-rosewood-400 font-semibold mt-2">
                  {card.label}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-1 font-light italic">
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pill highlight with total accumulated days */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-rosewood-500/20 text-xs text-neutral-300 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rosewood-400 fill-rosewood-400" />
            <span>
              Total acumulado: <strong className="text-white font-mono">{timeElapsed.totalDays}</strong> días de historia juntos
            </span>
          </div>

          {timeElapsed.days === 0 ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rosewood-500/20 to-champagne-400/20 border border-rosewood-400/40 text-xs text-champagne-200 shadow-lg shadow-rosewood-500/10 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
              <span>
                ✨ <strong className="text-white font-semibold">¡Hoy es 21!</strong> Feliz cumplemés, cumplimos {timeElapsed.months} hermosos meses juntos ❤️
              </span>
            </div>
          ) : (
            timeElapsed.nextAnniversaryDays > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-champagne-400/20 text-xs text-neutral-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
                <span>
                  Faltan <strong className="text-champagne-200 font-mono">{timeElapsed.nextAnniversaryDays}</strong> {timeElapsed.nextAnniversaryDays === 1 ? 'día' : 'días'} para nuestro {timeElapsed.months + 1}° cumplemés (este 21)
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
