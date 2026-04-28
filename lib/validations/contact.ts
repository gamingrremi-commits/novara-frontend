import { z } from 'zod';

export const BookingTypeEnum = z.enum([
  'showroom_visit',
  'engagement_consultation',
  'custom_order',
  'repair',
  'appraisal',
  'general',
]);

export type BookingType = z.infer<typeof BookingTypeEnum>;

export const ContactFormSchema = z.object({
  first_name: z
    .string()
    .min(2, 'Emri duhet të ketë të paktën 2 karaktere')
    .max(50, 'Emri është shumë i gjatë'),
  last_name: z
    .string()
    .min(2, 'Mbiemri duhet të ketë të paktën 2 karaktere')
    .max(50, 'Mbiemri është shumë i gjatë'),
  email: z.string().email('Email i pavlefshëm').max(200),
  phone: z
    .string()
    .min(6, 'Telefon i pavlefshëm')
    .max(20, 'Telefon i pavlefshëm')
    .regex(/^[\d\s+\-()]+$/, 'Telefon i pavlefshëm'),
  type: BookingTypeEnum,
  message: z.string().max(2000, 'Mesazhi është shumë i gjatë').optional(),
  preferred_date: z.string().optional(),
  product_slug: z.string().optional(),
  // Honeypot — should always be empty for real users
  website: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const BOOKING_TYPE_LABELS = {
  sq: {
    showroom_visit: 'Rezervo provim në dyqan',
    engagement_consultation: 'Konsultim për unazë fejese',
    custom_order: 'Porosi me dizajn personal',
    repair: 'Riparim ose restaurim',
    appraisal: 'Vlerësim & certifikim',
    general: 'Pyetje e përgjithshme',
  },
  en: {
    showroom_visit: 'Book in-store visit',
    engagement_consultation: 'Engagement ring consultation',
    custom_order: 'Custom design order',
    repair: 'Repair or restoration',
    appraisal: 'Appraisal & certification',
    general: 'General inquiry',
  },
} as const;
