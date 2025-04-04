import type { Database } from './supabase';

/**
 * 테이블의 Row 타입 - 데이터 조회 시 사용
 * 예: const user: Tables<'users'> = ...
 */
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

/**
 * 테이블의 Insert 타입 - 데이터 삽입 시 사용
 * 예: const newUser: InsertTables<'users'> = ...
 */
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

/**
 * 테이블의 Update 타입 - 데이터 업데이트 시 사용
 * 예: const userUpdate: UpdateTables<'users'> = ...
 */
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

/**
 * 열거형(Enum) 타입 참조
 * 예: const status: Enums<'status_type'> = ...
 */
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

/**
 * 특정 테이블에서 일부 필드만 선택
 * 예: const userProfile: PickTable<'users', 'id' | 'name' | 'email'> = ...
 */
export type PickTable<
  T extends keyof Database['public']['Tables'],
  K extends keyof Database['public']['Tables'][T]['Row'],
> = Pick<Database['public']['Tables'][T]['Row'], K>;

/**
 * 특정 테이블에서 일부 필드를 제외
 * 예: const userWithoutSensitiveInfo: OmitTable<'users', 'password' | 'secret_key'> = ...
 */
export type OmitTable<
  T extends keyof Database['public']['Tables'],
  K extends keyof Database['public']['Tables'][T]['Row'],
> = Pick<
  Database['public']['Tables'][T]['Row'],
  Exclude<keyof Database['public']['Tables'][T]['Row'], K>
>;

/**
 * 제네릭 Join 타입 - 두 테이블을 조인할 때 사용
 * 예: type UserWithPosts = JoinTables<'users', 'posts'>
 */
export type JoinTables<
  T1 extends keyof Database['public']['Tables'],
  T2 extends keyof Database['public']['Tables'],
> = Tables<T1> & {
  [K in keyof Database['public']['Tables'][T2]['Row']]:
    | Tables<T2>
    | Tables<T2>[];
};

/**
 * 함수 반환 타입을 쉽게 정의
 */
export type DBResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };
