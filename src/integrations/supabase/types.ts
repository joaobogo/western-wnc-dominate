export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      chatbot_conversations: {
        Row: {
          consent_given: boolean | null
          consent_text: string | null
          contact_path: string | null
          converted_to_lead: boolean | null
          created_at: string
          email: string | null
          full_transcript: Json | null
          id: string
          jobtread_alerted: boolean
          jobtread_error_message: string | null
          jobtread_exhausted_at: string | null
          jobtread_id: string | null
          jobtread_last_attempt_at: string | null
          jobtread_next_retry_at: string | null
          jobtread_retry_count: number
          jobtread_sync_status: string
          jobtread_synced: boolean
          lead_id: string | null
          name: string | null
          page_url: string | null
          phone: string | null
          project_type: string | null
          property_town: string | null
          recommended_next_step: string | null
          referrer: string | null
          service_category: string | null
          session_id: string | null
          summary: string | null
          updated_at: string
          urgency: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          consent_given?: boolean | null
          consent_text?: string | null
          contact_path?: string | null
          converted_to_lead?: boolean | null
          created_at?: string
          email?: string | null
          full_transcript?: Json | null
          id?: string
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string
          jobtread_synced?: boolean
          lead_id?: string | null
          name?: string | null
          page_url?: string | null
          phone?: string | null
          project_type?: string | null
          property_town?: string | null
          recommended_next_step?: string | null
          referrer?: string | null
          service_category?: string | null
          session_id?: string | null
          summary?: string | null
          updated_at?: string
          urgency?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          consent_given?: boolean | null
          consent_text?: string | null
          contact_path?: string | null
          converted_to_lead?: boolean | null
          created_at?: string
          email?: string | null
          full_transcript?: Json | null
          id?: string
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string
          jobtread_synced?: boolean
          lead_id?: string | null
          name?: string | null
          page_url?: string | null
          phone?: string | null
          project_type?: string | null
          property_town?: string | null
          recommended_next_step?: string | null
          referrer?: string | null
          service_category?: string | null
          session_id?: string | null
          summary?: string | null
          updated_at?: string
          urgency?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_requests: {
        Row: {
          budget_range: string | null
          conversation_log: Json | null
          created_at: string
          email: string | null
          has_plans: boolean | null
          id: string
          insurance_status: string | null
          jobtread_alerted: boolean
          jobtread_error_message: string | null
          jobtread_exhausted_at: string | null
          jobtread_id: string | null
          jobtread_last_attempt_at: string | null
          jobtread_next_retry_at: string | null
          jobtread_payload: Json | null
          jobtread_retry_count: number
          jobtread_sync_status: string | null
          jobtread_synced: boolean
          lead_score: number | null
          metadata: Json | null
          name: string | null
          phone: string | null
          project_description: string | null
          project_type: string | null
          property_type: string | null
          service_category: string | null
          source: string | null
          status: string | null
          timeline: string | null
          town: string | null
          urgency: string | null
        }
        Insert: {
          budget_range?: string | null
          conversation_log?: Json | null
          created_at?: string
          email?: string | null
          has_plans?: boolean | null
          id?: string
          insurance_status?: string | null
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_payload?: Json | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string | null
          jobtread_synced?: boolean
          lead_score?: number | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          project_description?: string | null
          project_type?: string | null
          property_type?: string | null
          service_category?: string | null
          source?: string | null
          status?: string | null
          timeline?: string | null
          town?: string | null
          urgency?: string | null
        }
        Update: {
          budget_range?: string | null
          conversation_log?: Json | null
          created_at?: string
          email?: string | null
          has_plans?: boolean | null
          id?: string
          insurance_status?: string | null
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_payload?: Json | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string | null
          jobtread_synced?: boolean
          lead_score?: number | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          project_description?: string | null
          project_type?: string | null
          property_type?: string | null
          service_category?: string | null
          source?: string | null
          status?: string | null
          timeline?: string | null
          town?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          created_at: string
          element_id: string | null
          event_type: string
          id: string
          label: string | null
          metadata: Json | null
          path: string
          session_id: string | null
        }
        Insert: {
          created_at?: string
          element_id?: string | null
          event_type: string
          id?: string
          label?: string | null
          metadata?: Json | null
          path: string
          session_id?: string | null
        }
        Update: {
          created_at?: string
          element_id?: string | null
          event_type?: string
          id?: string
          label?: string | null
          metadata?: Json | null
          path?: string
          session_id?: string | null
        }
        Relationships: []
      }
      deploy_drift_alerts: {
        Row: {
          created_at: string
          deployed_commit: string
          expected_commit: string
          id: string
        }
        Insert: {
          created_at?: string
          deployed_commit: string
          expected_commit: string
          id?: string
        }
        Update: {
          created_at?: string
          deployed_commit?: string
          expected_commit?: string
          id?: string
        }
        Relationships: []
      }
      designer_leads: {
        Row: {
          created_at: string
          design_id: string | null
          email: string
          gdpr_consent: boolean | null
          id: string
          jobtread_alerted: boolean
          jobtread_error_message: string | null
          jobtread_exhausted_at: string | null
          jobtread_id: string | null
          jobtread_last_attempt_at: string | null
          jobtread_next_retry_at: string | null
          jobtread_payload: Json | null
          jobtread_retry_count: number
          jobtread_sync_status: string | null
          jobtread_synced: boolean
          name: string
          phone: string | null
          source: string | null
          timeline: string | null
          town: string | null
        }
        Insert: {
          created_at?: string
          design_id?: string | null
          email: string
          gdpr_consent?: boolean | null
          id?: string
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_payload?: Json | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string | null
          jobtread_synced?: boolean
          name: string
          phone?: string | null
          source?: string | null
          timeline?: string | null
          town?: string | null
        }
        Update: {
          created_at?: string
          design_id?: string | null
          email?: string
          gdpr_consent?: boolean | null
          id?: string
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_payload?: Json | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string | null
          jobtread_synced?: boolean
          name?: string
          phone?: string | null
          source?: string | null
          timeline?: string | null
          town?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "designer_leads_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "roof_designs"
            referencedColumns: ["id"]
          },
        ]
      }
      designer_metrics: {
        Row: {
          created_at: string
          design_id: string | null
          event_type: string
          id: string
          metadata: Json | null
          session_id: string | null
        }
        Insert: {
          created_at?: string
          design_id?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
        }
        Update: {
          created_at?: string
          design_id?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "designer_metrics_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "roof_designs"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_leads: {
        Row: {
          address: string | null
          appointment: Json
          best_time: string | null
          breakdown: Json
          budget_range: string | null
          call_by: string | null
          channel: string | null
          created_at: string
          details: string | null
          email: string | null
          first_name: string | null
          flags: Json
          gates: Json
          grade: string
          id: string
          job_type: string | null
          last_name: string | null
          location_tier: string | null
          not_offered: boolean
          owner_contact: string | null
          owner_name: string | null
          payload: Json
          phone: string | null
          preferred_contact: string | null
          property_type: string | null
          relationship: string | null
          score: number | null
          score_version: string
          source: string | null
          source_detail: string | null
          spoke_live: boolean
          status: string
          taken_by: string | null
          timing: string | null
          town: string | null
          vendor_call: boolean
        }
        Insert: {
          address?: string | null
          appointment?: Json
          best_time?: string | null
          breakdown?: Json
          budget_range?: string | null
          call_by?: string | null
          channel?: string | null
          created_at?: string
          details?: string | null
          email?: string | null
          first_name?: string | null
          flags?: Json
          gates?: Json
          grade?: string
          id?: string
          job_type?: string | null
          last_name?: string | null
          location_tier?: string | null
          not_offered?: boolean
          owner_contact?: string | null
          owner_name?: string | null
          payload?: Json
          phone?: string | null
          preferred_contact?: string | null
          property_type?: string | null
          relationship?: string | null
          score?: number | null
          score_version?: string
          source?: string | null
          source_detail?: string | null
          spoke_live?: boolean
          status?: string
          taken_by?: string | null
          timing?: string | null
          town?: string | null
          vendor_call?: boolean
        }
        Update: {
          address?: string | null
          appointment?: Json
          best_time?: string | null
          breakdown?: Json
          budget_range?: string | null
          call_by?: string | null
          channel?: string | null
          created_at?: string
          details?: string | null
          email?: string | null
          first_name?: string | null
          flags?: Json
          gates?: Json
          grade?: string
          id?: string
          job_type?: string | null
          last_name?: string | null
          location_tier?: string | null
          not_offered?: boolean
          owner_contact?: string | null
          owner_name?: string | null
          payload?: Json
          phone?: string | null
          preferred_contact?: string | null
          property_type?: string | null
          relationship?: string | null
          score?: number | null
          score_version?: string
          source?: string | null
          source_detail?: string | null
          spoke_live?: boolean
          status?: string
          taken_by?: string | null
          timing?: string | null
          town?: string | null
          vendor_call?: boolean
        }
        Relationships: []
      }
      internal_config: {
        Row: {
          created_at: string
          key: string
          value: string
        }
        Insert: {
          created_at?: string
          key: string
          value: string
        }
        Update: {
          created_at?: string
          key?: string
          value?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          attachments: Json | null
          budget_range: string | null
          chat_summary: string | null
          company_name: string | null
          consent_given: boolean | null
          consent_text: string | null
          created_at: string
          crm_id: string | null
          crm_sync_status: string
          crm_synced: boolean
          email: string | null
          fbclid: string | null
          files_uploaded: Json | null
          first_name: string | null
          first_seen_at: string | null
          full_chat_transcript: Json | null
          gclid: string | null
          has_plans: boolean | null
          id: string
          idempotency_key: string | null
          insurance_status: string | null
          ip_address: string | null
          is_company: boolean
          jobtread_account_id: string | null
          jobtread_alerted: boolean
          jobtread_error_message: string | null
          jobtread_exhausted_at: string | null
          jobtread_id: string | null
          jobtread_last_attempt_at: string | null
          jobtread_next_retry_at: string | null
          jobtread_payload: Json | null
          jobtread_retry_count: number
          jobtread_sync_status: string
          jobtread_synced: boolean
          landing_page: string | null
          landing_url: string | null
          last_name: string | null
          lead_score: number | null
          lead_type: string | null
          li_fat_id: string | null
          metadata: Json | null
          msclkid: string | null
          name: string | null
          notes: string | null
          page_path: string | null
          page_url: string | null
          phone: string | null
          photos_uploaded: Json | null
          preferred_contact_method: string | null
          project_description: string | null
          project_type: string | null
          property_address: string | null
          property_county: string | null
          property_state: string | null
          property_town: string | null
          property_type: string | null
          property_zip: string | null
          referrer: string | null
          roofing_issue_type: string | null
          service_category: string | null
          source: string
          source_context: string | null
          status: string
          submitted_at: string | null
          timeline: string | null
          updated_at: string
          urgency: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          attachments?: Json | null
          budget_range?: string | null
          chat_summary?: string | null
          company_name?: string | null
          consent_given?: boolean | null
          consent_text?: string | null
          created_at?: string
          crm_id?: string | null
          crm_sync_status?: string
          crm_synced?: boolean
          email?: string | null
          fbclid?: string | null
          files_uploaded?: Json | null
          first_name?: string | null
          first_seen_at?: string | null
          full_chat_transcript?: Json | null
          gclid?: string | null
          has_plans?: boolean | null
          id?: string
          idempotency_key?: string | null
          insurance_status?: string | null
          ip_address?: string | null
          is_company?: boolean
          jobtread_account_id?: string | null
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_payload?: Json | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string
          jobtread_synced?: boolean
          landing_page?: string | null
          landing_url?: string | null
          last_name?: string | null
          lead_score?: number | null
          lead_type?: string | null
          li_fat_id?: string | null
          metadata?: Json | null
          msclkid?: string | null
          name?: string | null
          notes?: string | null
          page_path?: string | null
          page_url?: string | null
          phone?: string | null
          photos_uploaded?: Json | null
          preferred_contact_method?: string | null
          project_description?: string | null
          project_type?: string | null
          property_address?: string | null
          property_county?: string | null
          property_state?: string | null
          property_town?: string | null
          property_type?: string | null
          property_zip?: string | null
          referrer?: string | null
          roofing_issue_type?: string | null
          service_category?: string | null
          source: string
          source_context?: string | null
          status?: string
          submitted_at?: string | null
          timeline?: string | null
          updated_at?: string
          urgency?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          attachments?: Json | null
          budget_range?: string | null
          chat_summary?: string | null
          company_name?: string | null
          consent_given?: boolean | null
          consent_text?: string | null
          created_at?: string
          crm_id?: string | null
          crm_sync_status?: string
          crm_synced?: boolean
          email?: string | null
          fbclid?: string | null
          files_uploaded?: Json | null
          first_name?: string | null
          first_seen_at?: string | null
          full_chat_transcript?: Json | null
          gclid?: string | null
          has_plans?: boolean | null
          id?: string
          idempotency_key?: string | null
          insurance_status?: string | null
          ip_address?: string | null
          is_company?: boolean
          jobtread_account_id?: string | null
          jobtread_alerted?: boolean
          jobtread_error_message?: string | null
          jobtread_exhausted_at?: string | null
          jobtread_id?: string | null
          jobtread_last_attempt_at?: string | null
          jobtread_next_retry_at?: string | null
          jobtread_payload?: Json | null
          jobtread_retry_count?: number
          jobtread_sync_status?: string
          jobtread_synced?: boolean
          landing_page?: string | null
          landing_url?: string | null
          last_name?: string | null
          lead_score?: number | null
          lead_type?: string | null
          li_fat_id?: string | null
          metadata?: Json | null
          msclkid?: string | null
          name?: string | null
          notes?: string | null
          page_path?: string | null
          page_url?: string | null
          phone?: string | null
          photos_uploaded?: Json | null
          preferred_contact_method?: string | null
          project_description?: string | null
          project_type?: string | null
          property_address?: string | null
          property_county?: string | null
          property_state?: string | null
          property_town?: string | null
          property_type?: string | null
          property_zip?: string | null
          referrer?: string | null
          roofing_issue_type?: string | null
          service_category?: string | null
          source?: string
          source_context?: string | null
          status?: string
          submitted_at?: string | null
          timeline?: string | null
          updated_at?: string
          urgency?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      roof_designs: {
        Row: {
          color_hex: string | null
          created_at: string
          finish: string | null
          id: string
          mask_data: Json | null
          material_id: string | null
          material_name: string | null
          original_image_path: string
          result_image_path: string | null
          session_id: string
        }
        Insert: {
          color_hex?: string | null
          created_at?: string
          finish?: string | null
          id?: string
          mask_data?: Json | null
          material_id?: string | null
          material_name?: string | null
          original_image_path: string
          result_image_path?: string | null
          session_id: string
        }
        Update: {
          color_hex?: string | null
          created_at?: string
          finish?: string | null
          id?: string
          mask_data?: Json | null
          material_id?: string | null
          material_name?: string | null
          original_image_path?: string
          result_image_path?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roof_designs_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "roof_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      roof_materials: {
        Row: {
          category: string
          color_hex: string
          color_name: string
          created_at: string
          finish: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
          texture_url: string | null
        }
        Insert: {
          category: string
          color_hex: string
          color_name: string
          created_at?: string
          finish?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
          texture_url?: string | null
        }
        Update: {
          category?: string
          color_hex?: string
          color_name?: string
          created_at?: string
          finish?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
          texture_url?: string | null
        }
        Relationships: []
      }
      seo_404_log: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          path: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          path: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          path?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      seo_reports: {
        Row: {
          created_at: string
          email_recipient: string | null
          email_status: string | null
          errors: Json | null
          gsc_avg_ctr: number | null
          gsc_avg_position: number | null
          gsc_indexed_pages: number | null
          gsc_top_keywords: Json | null
          gsc_top_pages: Json | null
          gsc_total_clicks: number | null
          gsc_total_impressions: number | null
          id: string
          period_end: string
          period_start: string
          raw_data: Json | null
          sitemap_status: string | null
          sitemap_url_count: number | null
          top_404_paths: Json | null
          total_404s: number | null
        }
        Insert: {
          created_at?: string
          email_recipient?: string | null
          email_status?: string | null
          errors?: Json | null
          gsc_avg_ctr?: number | null
          gsc_avg_position?: number | null
          gsc_indexed_pages?: number | null
          gsc_top_keywords?: Json | null
          gsc_top_pages?: Json | null
          gsc_total_clicks?: number | null
          gsc_total_impressions?: number | null
          id?: string
          period_end: string
          period_start: string
          raw_data?: Json | null
          sitemap_status?: string | null
          sitemap_url_count?: number | null
          top_404_paths?: Json | null
          total_404s?: number | null
        }
        Update: {
          created_at?: string
          email_recipient?: string | null
          email_status?: string | null
          errors?: Json | null
          gsc_avg_ctr?: number | null
          gsc_avg_position?: number | null
          gsc_indexed_pages?: number | null
          gsc_top_keywords?: Json | null
          gsc_top_pages?: Json | null
          gsc_total_clicks?: number | null
          gsc_total_impressions?: number | null
          id?: string
          period_end?: string
          period_start?: string
          raw_data?: Json | null
          sitemap_status?: string | null
          sitemap_url_count?: number | null
          top_404_paths?: Json | null
          total_404s?: number | null
        }
        Relationships: []
      }
      site_health_checks: {
        Row: {
          alerted: boolean
          build_commit: string | null
          checked_count: number
          created_at: string
          failure_count: number
          failure_key: string | null
          id: string
          ok: boolean
          results: Json
        }
        Insert: {
          alerted?: boolean
          build_commit?: string | null
          checked_count?: number
          created_at?: string
          failure_count?: number
          failure_key?: string | null
          id?: string
          ok: boolean
          results?: Json
        }
        Update: {
          alerted?: boolean
          build_commit?: string | null
          checked_count?: number
          created_at?: string
          failure_count?: number
          failure_key?: string | null
          id?: string
          ok?: boolean
          results?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
