'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';

const useNotifications = () => {
  const { user } = useAuth();
  const [applicantNotifications, setApplicantNotifications] = useState([]);
  const [acceptedNotifications, setAcceptedNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setApplicantNotifications([]);
      setAcceptedNotifications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data: myProjects } = await supabase
        .from('projects')
        .select('id, name')
        .eq('owner_id', user.id);

      const projectIds = (myProjects || []).map(p => p.id);

      let applicants = [];
      if (projectIds.length > 0) {
        const { data: v } = await supabase
          .from('vacancies')
          .select('id, role, project_id, applicants, applicant_notified, projects!inner(name)')
          .in('project_id', projectIds)
          .eq('applicant_notified', false)
          .not('applicants', 'is', null);

        applicants = (v || []).filter(
          vac => vac.applicants && vac.applicants.length > 0
        );
      }

      setApplicantNotifications(applicants);

      const accepted = user.accepted_notifications || [];
      setAcceptedNotifications(accepted);
    } catch (err) {
      console.error('Ошибка загрузки уведомлений:', err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const totalUnread = applicantNotifications.length + acceptedNotifications.length;

  const markApplicantsRead = async () => {
    if (applicantNotifications.length === 0) return;

    const ids = applicantNotifications.map(n => n.id);
    await supabase.from('vacancies').update({ applicant_notified: true }).in('id', ids);
    setApplicantNotifications([]);
  };

  const markAcceptedRead = async () => {
    if (!user || acceptedNotifications.length === 0) return;

    await supabase.from('profiles').update({ accepted_notifications: [] }).eq('id', user.id);
    setAcceptedNotifications([]);
  };

  return {
    applicantNotifications,
    acceptedNotifications,
    totalUnread,
    loading,
    markApplicantsRead,
    markAcceptedRead,
    refresh: fetchNotifications,
  };
};

export default useNotifications;
