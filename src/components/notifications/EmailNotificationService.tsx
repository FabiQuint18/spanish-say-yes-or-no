
import React, { useEffect } from 'react';
import { Validation, checkExpiringValidations } from '@/types/validation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmailNotificationServiceProps {
  validations: Validation[];
  userEmail?: string;
  enabled?: boolean;
}

const EmailNotificationService = ({ 
  validations, 
  userEmail,
  enabled = true 
}: EmailNotificationServiceProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (!enabled || !userEmail) return;

    const { sixMonths, threeMonths, oneMonth } = checkExpiringValidations(validations);
    const expired = validations.filter(v => v.status === 'vencido');

    // Simulate email sending for 6 months reminder
    if (sixMonths.length > 0) {
      console.log('📧 Enviando recordatorio de 6 meses a:', userEmail);
      console.log('Validaciones que vencen en 6 meses:', sixMonths);
      
      // Simulate email API call
      setTimeout(() => {
        toast({
          title: t('notifications.expiry_reminder_6months'),
          description: `${sixMonths.length} validaciones vencerán en los próximos 6 meses. ${t('notifications.email_sent')} a ${userEmail}`,
          variant: "default",
        });
      }, 1000);
    }

    // Simulate email sending for 3 months reminder
    if (threeMonths.length > 0) {
      console.log('📧 Enviando recordatorio de 3 meses a:', userEmail);
      console.log('Validaciones que vencen en 3 meses:', threeMonths);
      
      setTimeout(() => {
        toast({
          title: t('notifications.expiry_reminder_3months'),
          description: `${threeMonths.length} validaciones vencerán en los próximos 3 meses. ${t('notifications.email_sent')} a ${userEmail}`,
          variant: "default",
        });
      }, 2000);
    }

    // Simulate email sending for 1 month critical reminder
    if (oneMonth.length > 0) {
      console.log('📧 Enviando alerta crítica de 1 mes a:', userEmail);
      console.log('Validaciones que vencen en 1 mes:', oneMonth);
      
      setTimeout(() => {
        toast({
          title: t('notifications.expiry_reminder_1month'),
          description: `${oneMonth.length} validaciones vencerán en el próximo mes. ${t('notifications.email_sent')} a ${userEmail}`,
          variant: "destructive",
        });
      }, 3000);
    }

    // Simulate email sending for expired validations
    if (expired.length > 0) {
      console.log('📧 Enviando alerta de validaciones vencidas a:', userEmail);
      console.log('Validaciones vencidas:', expired);
      
      setTimeout(() => {
        toast({
          title: t('notifications.expiry_expired'),
          description: `${expired.length} validaciones están vencidas. ${t('notifications.email_sent')} a ${userEmail}`,
          variant: "destructive",
        });
      }, 4000);
    }

    // Simulate automatic email scheduling
    const scheduleNextReminder = () => {
      console.log('📅 Programando próximos recordatorios automáticos...');
      console.log('Los recordatorios se enviarán automáticamente según las fechas de vencimiento');
    };

    scheduleNextReminder();

  }, [validations, userEmail, enabled, toast, t]);

  return null; // Invisible service component
};

export default EmailNotificationService;
