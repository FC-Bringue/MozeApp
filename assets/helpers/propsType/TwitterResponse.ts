export interface TwitterResponse {
    data?: (DataEntity)[] | null;
    includes: Includes;
    meta: Meta;
  }

export interface DataEntity {
    author_id: string;
    id: string;
    text: string;
}

export interface Includes {
    users?: (UsersEntity)[] | null;
}
  
export interface UsersEntity {
    profile_image_url: string;
    id: string;
    name: string;
    username: string;
    created_at: string;
  }
  
export interface Meta {
    newest_id: string;
    oldest_id: string;
    result_count: number;
    next_token: string;
  }
  