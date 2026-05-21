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
      consultation_requests: {
        Row: {
          budget_range: string | null
          conversation_log: Json | null
          created_at: string
          email: string | null
          has_plans: boolean | null
          id: string
          insurance_status: string | null
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
      designer_leads: {
        Row: {
          created_at: string
          design_id: string | null
          email: string
          gdpr_consent: boolean | null
          id: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
