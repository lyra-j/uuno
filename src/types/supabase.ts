export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      card_views: {
        Row: {
          card_id: string;
          duration: number | null;
          element_name: string | null;
          end_at: string | null;
          id: string;
          occurred_at: string | null;
          session_id: string | null;
          source: Database['public']['Enums']['card_views_source'] | null;
          started_at: string | null;
          type: Database['public']['Enums']['interactions_type'] | null;
          viewer_id: string | null;
          viewer_ip: string | null;
        };
        Insert: {
          card_id: string;
          duration?: number | null;
          element_name?: string | null;
          end_at?: string | null;
          id?: string;
          occurred_at?: string | null;
          session_id?: string | null;
          source?: Database['public']['Enums']['card_views_source'] | null;
          started_at?: string | null;
          type?: Database['public']['Enums']['interactions_type'] | null;
          viewer_id?: string | null;
          viewer_ip?: string | null;
        };
        Update: {
          card_id?: string;
          duration?: number | null;
          element_name?: string | null;
          end_at?: string | null;
          id?: string;
          occurred_at?: string | null;
          session_id?: string | null;
          source?: Database['public']['Enums']['card_views_source'] | null;
          started_at?: string | null;
          type?: Database['public']['Enums']['interactions_type'] | null;
          viewer_id?: string | null;
          viewer_ip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'card_views_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'cards';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'card_views_viewer_id_fkey';
            columns: ['viewer_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      cards: {
        Row: {
          back_content: Json | null;
          backImgURL: string | null;
          created_at: string;
          front_content: Json | null;
          frontImgURL: string | null;
          id: string;
          slug: string;
          status: Database['public']['Enums']['cards_status'] | null;
          template_id: string;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          back_content?: Json | null;
          backImgURL?: string | null;
          created_at?: string;
          front_content?: Json | null;
          frontImgURL?: string | null;
          id?: string;
          slug: string;
          status?: Database['public']['Enums']['cards_status'] | null;
          template_id: string;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          back_content?: Json | null;
          backImgURL?: string | null;
          created_at?: string;
          front_content?: Json | null;
          frontImgURL?: string | null;
          id?: string;
          slug?: string;
          status?: Database['public']['Enums']['cards_status'] | null;
          template_id?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'cards_template_id_fkey';
            columns: ['template_id'];
            isOneToOne: false;
            referencedRelation: 'templates';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cards_user_id_fkey1';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      links: {
        Row: {
          card_id: string;
          icon_path: string | null;
          id: string;
          platform: string | null;
          url: string | null;
        };
        Insert: {
          card_id?: string;
          icon_path?: string | null;
          id?: string;
          platform?: string | null;
          url?: string | null;
        };
        Update: {
          card_id?: string;
          icon_path?: string | null;
          id?: string;
          platform?: string | null;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'links_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'cards';
            referencedColumns: ['id'];
          },
        ];
      };
      templates: {
        Row: {
          id: string;
          name: string;
          structure: Json;
          style: Database['public']['Enums']['templates_style'] | null;
          thumbnail: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          structure: Json;
          style?: Database['public']['Enums']['templates_style'] | null;
          thumbnail?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          structure?: Json;
          style?: Database['public']['Enums']['templates_style'] | null;
          thumbnail?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          nick_name: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          nick_name: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          nick_name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      daily_card_saves: {
        Row: {
          card_id: string | null;
          save_date: string | null;
          unique_saves: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'card_views_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'cards';
            referencedColumns: ['id'];
          },
        ];
      };
      daily_card_views: {
        Row: {
          card_id: string | null;
          unique_sessions: number | null;
          view_date: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'card_views_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'cards';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      card_views_source: 'direct' | 'qr' | 'link' | 'tag';
      cards_status: 'draft' | 'published';
      interactions_type: 'click' | 'save';
      templates_style: 'simple' | 'trendy';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      card_views_source: ['direct', 'qr', 'link', 'tag'],
      cards_status: ['draft', 'published'],
      interactions_type: ['click', 'save'],
      templates_style: ['simple', 'trendy'],
    },
  },
} as const;
