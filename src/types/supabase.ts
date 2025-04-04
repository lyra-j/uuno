export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      card_views: {
        Row: {
          card_id: string
          element_name: string | null
          end_at: string | null
          id: string
          occurred_at: string | null
          source: Database["public"]["Enums"]["card_views_source"] | null
          started_at: string | null
          type: Database["public"]["Enums"]["interactions_type"] | null
          viewer_id: string | null
          viewer_ip: string | null
        }
        Insert: {
          card_id: string
          element_name?: string | null
          end_at?: string | null
          id?: string
          occurred_at?: string | null
          source?: Database["public"]["Enums"]["card_views_source"] | null
          started_at?: string | null
          type?: Database["public"]["Enums"]["interactions_type"] | null
          viewer_id?: string | null
          viewer_ip?: string | null
        }
        Update: {
          card_id?: string
          element_name?: string | null
          end_at?: string | null
          id?: string
          occurred_at?: string | null
          source?: Database["public"]["Enums"]["card_views_source"] | null
          started_at?: string | null
          type?: Database["public"]["Enums"]["interactions_type"] | null
          viewer_id?: string | null
          viewer_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_views_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          back_content: Json | null
          created_at: string
          front_content: Json | null
          id: string
          slug: string
          status: Database["public"]["Enums"]["cards_status"] | null
          template_id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          back_content?: Json | null
          created_at?: string
          front_content?: Json | null
          id?: string
          slug: string
          status?: Database["public"]["Enums"]["cards_status"] | null
          template_id: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          back_content?: Json | null
          created_at?: string
          front_content?: Json | null
          id?: string
          slug?: string
          status?: Database["public"]["Enums"]["cards_status"] | null
          template_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          id: string
          name: string
          structure: Json
          thumbnail: string | null
        }
        Insert: {
          id?: string
          name: string
          structure: Json
          thumbnail?: string | null
        }
        Update: {
          id?: string
          name?: string
          structure?: Json
          thumbnail?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          nick_name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nick_name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nick_name?: string
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
      card_views_source: "direct" | "qr" | "link" | "iframe"
      cards_status: "draft" | "published"
      interactions_type: "click" | "save"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
